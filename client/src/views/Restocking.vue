<template>
  <div class="restocking">
    <div class="page-header">
      <h2>{{ t('restocking.title') }}</h2>
      <p>{{ t('restocking.description') }}</p>
    </div>

    <div class="card">
      <div class="budget-control">
        <label for="budget-slider" class="budget-label">{{ t('restocking.budgetLabel') }}</label>
        <div class="budget-row">
          <input
            id="budget-slider"
            v-model.number="budget"
            type="range"
            min="0"
            max="50000"
            step="500"
            class="budget-slider"
          />
          <span class="budget-value">{{ formatMoney(budget) }}</span>
        </div>
        <div class="budget-scale">
          <span>{{ formatMoney(0) }}</span>
          <span>{{ formatMoney(50000) }}</span>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card info">
        <div class="stat-label">{{ t('restocking.budget') }}</div>
        <div class="stat-value">{{ formatMoney(budget) }}</div>
      </div>
      <div class="stat-card success">
        <div class="stat-label">{{ t('restocking.recommendedSpend') }}</div>
        <div class="stat-value">{{ formatMoney(totalCost) }}</div>
      </div>
      <div class="stat-card warning">
        <div class="stat-label">{{ t('restocking.remaining') }}</div>
        <div class="stat-value">{{ formatMoney(remainingBudget) }}</div>
      </div>
    </div>

    <div v-if="confirmation" class="success-banner" role="status">
      <strong>{{ t('restocking.orderPlaced', { orderNumber: confirmation.order_number }) }}</strong>
      <span>{{ t('restocking.orderPlacedDetail', { days: confirmation.lead_time_days }) }}</span>
    </div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ t('restocking.recommendedItems') }} ({{ items.length }})</h3>
        <button
          type="button"
          class="place-order-btn"
          :disabled="items.length === 0 || submitting"
          @click="placeOrder"
        >
          {{ submitting ? t('restocking.submitting') : t('restocking.placeOrder') }}
        </button>
      </div>

      <div v-if="loading && items.length === 0" class="loading">{{ t('common.loading') }}</div>
      <div v-else-if="items.length === 0" class="empty-state">{{ t('restocking.empty') }}</div>
      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>{{ t('restocking.table.sku') }}</th>
              <th>{{ t('restocking.table.name') }}</th>
              <th>{{ t('restocking.table.trend') }}</th>
              <th class="num">{{ t('restocking.table.quantity') }}</th>
              <th class="num">{{ t('restocking.table.unitCost') }}</th>
              <th class="num">{{ t('restocking.table.lineCost') }}</th>
              <th class="num">{{ t('restocking.table.leadTime') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.sku">
              <td><strong>{{ item.sku }}</strong></td>
              <td>{{ translateProductName(item.name) }}</td>
              <td>
                <span :class="['badge', item.trend]">{{ trendLabel(item.trend) }}</span>
              </td>
              <td class="num">{{ item.quantity.toLocaleString() }}</td>
              <td class="num">{{ formatMoney(item.unit_cost, 2) }}</td>
              <td class="num"><strong>{{ formatMoney(item.line_cost, 2) }}</strong></td>
              <td class="num">{{ item.lead_time_days }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { api } from '../api'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Restocking',
  setup() {
    const { t, translateProductName } = useI18n()

    const budget = ref(10000)
    const items = ref([])
    const totalCost = ref(0)
    const remainingBudget = ref(10000)
    const loading = ref(false)
    const submitting = ref(false)
    const error = ref(null)
    const confirmation = ref(null)

    let debounceTimer = null
    let requestId = 0

    const formatMoney = (value, digits = 0) => {
      const num = Number(value)
      const safe = Number.isFinite(num) ? num : 0
      return safe.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      })
    }

    const trendLabel = (trend) => {
      const key = `trends.${trend}`
      const label = t(key)
      return label === key ? trend : label
    }

    const loadRecommendations = async () => {
      const current = ++requestId
      try {
        loading.value = true
        const data = await api.getRestockRecommendations(budget.value)
        if (current !== requestId) return // stale response
        items.value = data.items || []
        totalCost.value = data.total_cost ?? 0
        remainingBudget.value = data.remaining_budget ?? budget.value
        error.value = null
      } catch (err) {
        if (current !== requestId) return
        error.value = err.response?.data?.detail || t('restocking.loadError')
        console.error('Failed to load recommendations:', err)
      } finally {
        if (current === requestId) loading.value = false
      }
    }

    watch(budget, () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(loadRecommendations, 250)
    })

    const placeOrder = async () => {
      if (items.value.length === 0 || submitting.value) return
      try {
        submitting.value = true
        error.value = null
        confirmation.value = null
        const payload = {
          budget: budget.value,
          items: items.value.map(i => ({
            sku: i.sku,
            name: i.name,
            quantity: i.quantity,
            unit_cost: i.unit_cost,
            lead_time_days: i.lead_time_days
          }))
        }
        confirmation.value = await api.submitRestockOrder(payload)
        await loadRecommendations()
      } catch (err) {
        const detail = err.response?.data?.detail
        error.value = typeof detail === 'string' ? detail : t('restocking.submitError')
        console.error('Failed to submit order:', err)
      } finally {
        submitting.value = false
      }
    }

    onMounted(loadRecommendations)
    onBeforeUnmount(() => clearTimeout(debounceTimer))

    return {
      t,
      budget,
      items,
      totalCost,
      remainingBudget,
      loading,
      submitting,
      error,
      confirmation,
      formatMoney,
      trendLabel,
      placeOrder,
      translateProductName
    }
  }
}
</script>

<style scoped>
.budget-control {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.budget-label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.budget-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.budget-slider {
  flex: 1;
  accent-color: #2563eb;
  cursor: pointer;
}

.budget-value {
  min-width: 110px;
  text-align: right;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
}

.budget-scale {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94a3b8;
}

.num {
  text-align: right;
}

.place-order-btn {
  padding: 0.5rem 1.25rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.place-order-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.place-order-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.success-banner {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  font-size: 0.938rem;
}

.empty-state {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #64748b;
  font-size: 0.938rem;
}
</style>
