export const routes = {
  path: '/',
  meta: {
    label: 'Menu',
  },
  component: () => import('@/layouts/app/app-index.vue'),
  children: [
    {
      path: '',
      meta: {
        label: 'Index',
      },
      component: () => import('./views/page-index.vue'),
    },
    {
      path: 'sales',
      meta: {
        label: 'Sales',
      },
      children: [
        {
          path: 'sales-report',
          meta: {
            label: 'Sales Report',
          },
          component: () => import('./views/sales/page-sales-report.vue'),
        },
        {
          path: 'sales-report-customer',
          meta: {
            label: 'Sales Report per Customer',
          },
          component: () => import('./views/sales/page-sales-customer-report.vue'),
        },
      ],
    },
    {
      meta: {
        label: 'Purchase',
      },
      path: 'purchase',
      children: [
        {
          meta: {
            label: 'Purchase Report',
          },
          path: 'purchase-report',
          component: () => import('./views/purchase/page-purchase-report.vue'),
        },
        {
          meta: {
            label: 'Purchase Report Details',
          },
          path: 'purchase-report-details',
          component: () => import('./views/purchase/page-purchase-report-details.vue'),
        },
      ],
    },
    {
      meta: {
        label: 'Finance',
      },
      path: 'finance',
      children: [
        {
          meta: {
            label: 'Debts Aging Report',
          },
          path: 'debts-aging-report',
          component: () => import('./views/finance/page-debts-aging-report.vue'),
        },
        {
          meta: {
            label: 'Debts Aging Report per Customer',
          },
          path: 'debts-aging-customer-report',
          component: () => import('./views/finance/page-debts-aging-customer-report.vue'),
        },
      ],
    },
    {
      path: 'inventory',
      meta: {
        label: 'Inventory',
      },
      children: [
        {
          meta: {
            label: 'Inventory Report',
          },
          path: 'inventory-report',
          component: () => import('./views/inventory/page-inventory-report.vue'),
        },
      ],
    },
    {
      path: 'login',
      component: () => import('./views/page-login.vue'),
    },
  ],
};
