<script setup lang="ts">
import { VDatatable } from '@/components';
import { warehouses, items } from '@/data/index';

const columns = [
    {name: 'warehouse', label: 'Warehouse'},
    {name: 'item', label: 'Item'},
    {name: 'description', label: 'Description'},
    {name: 'productCode', label: 'Product Code'},
    {name: 'principle', label: 'Customer'},
    {name: 'totalInvoiced', label: 'Total Invoiced'},
    {name: 'totalBeforeDiscount', label: 'Total Before Discount'},
    {name: 'totalDiscount', label: 'Total Discount'},
    {name: 'totalAfterDiscount', label: 'Total After Discount'},
    {name: 'totalTax', label: 'Total Tax'},
    {name: 'totalAfterTax', label: 'Total After Tax'},
];

const filterFields = [
    {
        label: 'Date From',
        name: 'dateFrom',
        type: 'date',
        component: 'input',
        options: { date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] },
        placeholder: 'YYYY-MM-DD',
    },
    {
        label: 'Date To',
        name: 'dateTo',
        type: 'date',
        component: 'input',
        options: { date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] },
        placeholder: 'YYYY-MM-DD',
    },
    {
        label: 'Item',
        name: 'item',
        component: 'select',
        options: items,
        placeholder: 'Choose One',
    },
    {
        label: 'Warehouse',
        name: 'warehouse',
        component: 'select',
        options: warehouses,
        placeholder: 'Choose One',
    }
]

const templateData = [
    { id: 1, productCode:'NB001', warehouse: '2023-01-01', description:'PO-001', principle: 'supplier1', totalInvoiced: '2023-01-01', totalBeforeDiscount: 'NSJ-001', item: 'NFP-001', totalDiscount: '1000', totalAfterDiscount: '100', totalTax: '9000', totalAfterTax: '100',discount: '100' },
    { id: 2, productCode:'NB002', warehouse: '2022-01-01', description:'PO-002', principle: 'supplier2', totalInvoiced: '2022-01-01', totalBeforeDiscount: 'NSJ-002', item: 'NFP-002', totalDiscount: '2000', totalAfterDiscount: '100', totalTax: '1900', totalAfterTax: '100',discount: '100' },
    { id: 3, productCode:'NB003', warehouse: '2022-06-01', description:'PO-003', principle: 'supplier3', totalInvoiced: '2022-06-01', totalBeforeDiscount: 'NSJ-003', item: 'NFP-003', totalDiscount: '3000', totalAfterDiscount: '100', totalTax: '2900', totalAfterTax: '100',discount: '100' },
]

</script>
<template>
    <VDatatable 
        :filters="filterFields"
        :columns="columns"
        :template-data="templateData"
        url="salesReports"
    />
</template>