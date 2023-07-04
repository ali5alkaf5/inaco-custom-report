<script setup lang="ts">
import { VDatatable } from '@/components';
import { items, warehouses } from '@/data/index';

const columns = [
    {name: 'warehouse', label: 'Warehouse'},
    {name: 'item', label: 'Item'},
    {name: 'description', label: 'Description'},
    {name: 'quantityInStock', label: 'Qty In Stock'},
    {name: 'receiptsQuantity', label: 'Receipts Quantity'},
    {name: 'issuesQuantity', label: 'Issues Quantity'},
    {name: 'unitCost', label: 'Unit Cost'},
    {name: 'startBalanceCost', label: 'Start Balance Cost'},
    {name: 'receiptsAmount', label: 'Receipts Amount'},
    {name: 'issuesAmount', label: 'Issues Amount'},
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
    },
]

const item = 'itemTest'
const warehouse = 'warehouseTest'
const templateData = [
    { id: 1, warehouse: warehouse, item: item, description: '2023-01-01', quantityInStock:'PO-001', issuesQuantity: 'supplier1', unitCost: '2023-01-01', startBalanceCost: 'NSJ-001', receiptsAmount: 'nacme1', issuesAmount: '1000' },
    { id: 2, warehouse: warehouse, item: item, description: '2022-01-01', quantityInStock:'PO-002', issuesQuantity: 'supplier2', unitCost: '2022-01-01', startBalanceCost: 'NSJ-002', receiptsAmount: 'nacme2', issuesAmount: '2000' },
    { id: 3, warehouse: warehouse, item: item, description: '2022-06-01', quantityInStock:'PO-003', issuesQuantity: 'supplier3', unitCost: '2022-06-01', startBalanceCost: 'NSJ-003', receiptsAmount: 'nacme3', issuesAmount: '3000' },
]

</script>
<template>
    <VDatatable 
        :filters="filterFields"
        :columns="columns"
        url="inventoryReports"
        :template-data="templateData"
    />
</template>