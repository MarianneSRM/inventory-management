export default {
  // Navegación
  nav: {
    overview: 'Resumen',
    inventory: 'Inventario',
    orders: 'Pedidos',
    finance: 'Finanzas',
    demandForecast: 'Pronóstico de demanda',
    restocking: 'Reabastecimiento',
    companyName: 'Catalyst Components',
    subtitle: 'Sistema de gestión de inventario'
  },

  // Panel principal
  dashboard: {
    title: 'Resumen',
    kpi: {
      title: 'Indicadores clave de desempeño',
      inventoryTurnover: 'Rotación de inventario',
      ordersFulfilled: 'Pedidos cumplidos',
      orderFillRate: 'Tasa de cumplimiento de pedidos',
      revenue: 'Ingresos (pedidos)',
      revenueYTD: 'Ingresos (pedidos) en el año',
      revenueMTD: 'Ingresos (pedidos) en el mes',
      avgProcessingTime: 'Tiempo promedio de procesamiento (días)',
      goal: 'Meta'
    },
    summary: {
      title: 'Resumen'
    },
    orderHealth: {
      title: 'Estado de los pedidos',
      totalOrders: 'Total de pedidos',
      revenue: 'Ingresos',
      avgOrderValue: 'Valor promedio del pedido',
      onTimeRate: 'Tasa de entrega a tiempo',
      avgFulfillmentDays: 'Cumplimiento promedio (días)',
      total: 'Total'
    },
    ordersByMonth: {
      title: 'Pedidos por mes'
    },
    inventoryValue: {
      title: 'Valor del inventario por categoría'
    },
    inventoryShortages: {
      title: 'Faltantes de inventario',
      noShortages: 'No hay faltantes de inventario: todos los pedidos se pueden cumplir.',
      noData: 'No hay datos de inventario para los filtros seleccionados',
      orderId: 'ID del pedido',
      sku: 'SKU',
      itemName: 'Nombre del artículo',
      quantityNeeded: 'Cantidad necesaria',
      quantityAvailable: 'Cantidad disponible',
      shortage: 'Faltante',
      daysDelayed: 'Días de retraso',
      priority: 'Prioridad',
      unitsShort: 'unidades faltantes',
      days: 'días'
    },
    topProducts: {
      title: 'Principales productos por ingresos',
      sku: 'SKU',
      product: 'Producto',
      category: 'Categoría',
      warehouse: 'Almacén',
      stockStatus: 'Estado del stock',
      revenue: 'Ingresos',
      unitsOrdered: 'Unidades pedidas',
      firstOrder: 'Primer pedido',
      inStock: 'En stock',
      lowStock: 'Stock bajo'
    }
  },

  // Inventario
  inventory: {
    title: 'Inventario',
    description: 'Controla y administra todos los artículos del inventario',
    stockLevels: 'Niveles de stock',
    skus: 'SKUs',
    searchPlaceholder: 'Buscar por nombre del artículo...',
    clearSearch: 'Borrar búsqueda',
    totalItems: 'Total de artículos',
    totalValue: 'Valor total',
    lowStockItems: 'Artículos con stock bajo',
    warehouses: 'Almacenes',
    table: {
      sku: 'SKU',
      itemName: 'Nombre del artículo',
      name: 'Nombre',
      category: 'Categoría',
      warehouse: 'Almacén',
      quantity: 'Cantidad',
      quantityOnHand: 'Cantidad en existencia',
      reorderPoint: 'Punto de reorden',
      unitCost: 'Costo unitario',
      unitPrice: 'Precio unitario',
      totalValue: 'Valor total',
      location: 'Ubicación',
      status: 'Estado'
    }
  },

  // Pedidos
  orders: {
    title: 'Pedidos',
    description: 'Consulta y administra los pedidos de clientes',
    allOrders: 'Todos los pedidos',
    totalOrders: 'Total de pedidos',
    totalRevenue: 'Ingresos totales',
    avgOrderValue: 'Valor promedio del pedido',
    onTimeDelivery: 'Entrega a tiempo',
    itemsCount: '{count} artículos',
    quantity: 'Cant.',
    submittedOrders: 'Pedidos enviados',
    submittedOrdersEmpty: 'Todavía no se han enviado pedidos de reabastecimiento.',
    table: {
      leadTime: 'Plazo de entrega',
      submitted: 'Enviado',
      total: 'Total',
      orderNumber: 'Número de pedido',
      orderId: 'ID del pedido',
      orderDate: 'Fecha del pedido',
      date: 'Fecha',
      customer: 'Cliente',
      category: 'Categoría',
      warehouse: 'Almacén',
      items: 'Artículos',
      value: 'Valor',
      totalValue: 'Valor total',
      status: 'Estado',
      expectedDelivery: 'Entrega estimada',
      actualDelivery: 'Entrega real'
    }
  },

  // Reabastecimiento
  restocking: {
    title: 'Reabastecimiento',
    description: 'Planifica la compra de inventario recomendado dentro de un presupuesto',
    budget: 'Presupuesto',
    budgetLabel: 'Presupuesto de reabastecimiento',
    recommendedSpend: 'Gasto recomendado',
    remaining: 'Restante',
    recommendedItems: 'Artículos recomendados',
    table: {
      sku: 'SKU',
      name: 'Artículo',
      trend: 'Tendencia',
      quantity: 'Cantidad',
      unitCost: 'Costo unitario',
      lineCost: 'Costo total',
      leadTime: 'Plazo de entrega (días)'
    },
    empty: 'Ningún artículo cabe en este presupuesto. Aumenta el presupuesto para ver recomendaciones.',
    days: '{count} días',
    placeOrder: 'Realizar pedido',
    submitting: 'Enviando...',
    orderPlaced: 'Pedido {orderNumber} realizado',
    orderPlacedDetail: 'Entrega estimada en {days} días.',
    loadError: 'No se pudieron cargar las recomendaciones',
    submitError: 'No se pudo realizar el pedido'
  },

  // Finanzas
  finance: {
    title: 'Panel de finanzas',
    description: 'Controla ingresos, costos y desempeño financiero',
    totalRevenue: 'Ingresos totales',
    totalCosts: 'Costos totales',
    netProfit: 'Utilidad neta',
    avgOrderValue: 'Valor promedio del pedido',
    fromOrders: 'De {count} pedidos',
    costBreakdown: 'Compras + Operación + Mano de obra + Gastos generales',
    margin: 'margen',
    perOrderRevenue: 'Ingresos por pedido',
    revenueVsCosts: {
      title: 'Ingresos vs. costos mensuales',
      revenue: 'Ingresos',
      costs: 'Costos totales'
    },
    monthlyCostFlow: {
      title: 'Flujo mensual de costos',
      procurement: 'Compras',
      operational: 'Operación',
      labor: 'Mano de obra',
      overhead: 'Gastos generales'
    },
    categorySpending: {
      title: 'Gasto por categoría',
      ofTotal: 'del total'
    },
    transactions: {
      title: 'Transacciones recientes',
      id: 'ID',
      description: 'Descripción',
      vendor: 'Proveedor',
      date: 'Fecha',
      amount: 'Monto'
    }
  },

  // Pronóstico de demanda
  demand: {
    title: 'Pronóstico de demanda',
    description: 'Analiza las tendencias y pronósticos de demanda',
    increasingDemand: 'Demanda creciente',
    stableDemand: 'Demanda estable',
    decreasingDemand: 'Demanda decreciente',
    itemsCount: '{count} artículos',
    more: 'más...',
    demandForecasts: 'Pronósticos de demanda',
    table: {
      sku: 'SKU',
      itemName: 'Nombre del artículo',
      currentDemand: 'Demanda actual',
      forecastedDemand: 'Demanda pronosticada',
      change: 'Cambio',
      trend: 'Tendencia',
      period: 'Período'
    }
  },

  // Filtros
  filters: {
    timePeriod: 'Período',
    location: 'Ubicación',
    category: 'Categoría',
    orderStatus: 'Estado del pedido',
    all: 'Todos',
    allMonths: 'Todos los meses'
  },

  // Estados
  status: {
    delivered: 'Entregado',
    shipped: 'Enviado',
    processing: 'En proceso',
    backordered: 'Pendiente de stock',
    inStock: 'En stock',
    lowStock: 'Stock bajo',
    adequate: 'Adecuado'
  },

  // Tendencias
  trends: {
    increasing: 'creciente',
    stable: 'estable',
    decreasing: 'decreciente'
  },

  // Prioridad
  priority: {
    high: 'Alta',
    medium: 'Media',
    low: 'Baja'
  },

  // Categorías
  categories: {
    circuitBoards: 'Placas de circuito',
    sensors: 'Sensores',
    actuators: 'Actuadores',
    controllers: 'Controladores',
    powerSupplies: 'Fuentes de poder'
  },

  // Categorías de gasto
  spendingCategories: {
    rawMaterials: 'Materias primas',
    components: 'Componentes',
    equipment: 'Equipos',
    consumables: 'Consumibles'
  },

  // Almacenes
  warehouses: {
    sanFrancisco: 'San Francisco',
    london: 'Londres',
    tokyo: 'Tokio'
  },

  // Meses
  months: {
    jan: 'Ene',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Abr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Ago',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dic',
    january: 'Enero',
    february: 'Febrero',
    march: 'Marzo',
    april: 'Abril',
    june: 'Junio',
    july: 'Julio',
    august: 'Agosto',
    september: 'Septiembre',
    october: 'Octubre',
    november: 'Noviembre',
    december: 'Diciembre'
  },

  // Menú de perfil
  profile: {
    profileDetails: 'Detalles del perfil',
    myTasks: 'Mis tareas',
    logout: 'Cerrar sesión'
  },

  // Modal de detalles del perfil
  profileDetails: {
    title: 'Detalles del perfil',
    email: 'Correo electrónico',
    department: 'Departamento',
    location: 'Ubicación',
    phone: 'Teléfono',
    joinDate: 'Fecha de ingreso',
    employeeId: 'ID de empleado',
    close: 'Cerrar'
  },

  // Modal de tareas
  tasks: {
    title: 'Mis tareas',
    taskTitle: 'Título de la tarea',
    taskTitlePlaceholder: 'Escribe el título de la tarea...',
    priority: 'Prioridad',
    dueDate: 'Fecha límite',
    addTask: 'Agregar tarea',
    noTasks: 'Aún no hay tareas. ¡Agrega tu primera tarea arriba!'
  },

  // Idioma
  language: {
    english: 'Inglés',
    japanese: 'Japonés',
    spanish: 'Español',
    selectLanguage: 'Seleccionar idioma'
  },

  // Común
  common: {
    loading: 'Cargando...',
    error: 'Error',
    noData: 'No hay datos disponibles',
    viewDetails: 'Ver detalles',
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    items: 'artículos'
  }
}
