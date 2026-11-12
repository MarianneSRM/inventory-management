"""
Tests for the restocking endpoints (budget-based recommendations and submitted orders).
"""
import pytest

import main


@pytest.fixture(autouse=True)
def clear_orders():
    """Submitted restock orders live in memory; isolate each test."""
    main.submitted_restock_orders.clear()
    yield
    main.submitted_restock_orders.clear()


class TestRestockRecommendations:
    def test_zero_budget_returns_no_items(self, client):
        data = client.get("/api/restocking/recommendations?budget=0").json()
        assert data["items"] == []
        assert data["total_cost"] == 0
        assert data["remaining_budget"] == 0

    @pytest.mark.parametrize("budget", [500, 5000, 20000, 50000])
    def test_recommendations_respect_budget(self, client, budget):
        data = client.get(f"/api/restocking/recommendations?budget={budget}").json()
        assert data["total_cost"] <= budget
        assert data["remaining_budget"] == pytest.approx(budget - data["total_cost"])
        assert sum(i["line_cost"] for i in data["items"]) == pytest.approx(data["total_cost"])

    def test_increasing_demand_items_come_first(self, client):
        items = client.get("/api/restocking/recommendations?budget=50000").json()["items"]
        order = {"increasing": 0, "stable": 1, "decreasing": 2}
        ranks = [order[i["trend"]] for i in items]
        assert ranks == sorted(ranks)

    def test_larger_budget_never_recommends_less_spend(self, client):
        small = client.get("/api/restocking/recommendations?budget=5000").json()
        large = client.get("/api/restocking/recommendations?budget=30000").json()
        assert large["total_cost"] >= small["total_cost"]

    def test_negative_budget_rejected(self, client):
        assert client.get("/api/restocking/recommendations?budget=-1").status_code == 400


class TestRestockOrders:
    def _payload(self, client, budget=10000):
        recs = client.get(f"/api/restocking/recommendations?budget={budget}").json()
        assert recs["items"], "expected at least one recommendation"
        return {"budget": budget, "items": [
            {k: i[k] for k in ("sku", "name", "quantity", "unit_cost", "lead_time_days")}
            for i in recs["items"]
        ]}

    def test_submit_then_list(self, client):
        response = client.post("/api/restocking/orders", json=self._payload(client))
        assert response.status_code == 200
        order = response.json()
        assert order["status"] == "Submitted"
        assert order["lead_time_days"] == max(i["lead_time_days"] for i in order["items"])

        listed = client.get("/api/restocking/orders").json()
        assert [o["id"] for o in listed] == [order["id"]]

    def test_orders_listed_newest_first(self, client):
        first = client.post("/api/restocking/orders", json=self._payload(client)).json()
        second = client.post("/api/restocking/orders", json=self._payload(client)).json()
        listed = client.get("/api/restocking/orders").json()
        assert [o["id"] for o in listed] == [second["id"], first["id"]]

    def test_order_over_budget_rejected(self, client):
        payload = self._payload(client)
        payload["budget"] = 1
        assert client.post("/api/restocking/orders", json=payload).status_code == 400

    def test_empty_order_rejected(self, client):
        response = client.post("/api/restocking/orders", json={"budget": 1000, "items": []})
        assert response.status_code == 400

    def test_non_positive_quantity_rejected(self, client):
        payload = self._payload(client)
        payload["items"][0]["quantity"] = 0
        assert client.post("/api/restocking/orders", json=payload).status_code == 400
