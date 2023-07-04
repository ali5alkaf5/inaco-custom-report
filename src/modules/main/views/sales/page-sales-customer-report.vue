<script setup lang="ts">
import { VDatatable } from '@/components';
import { customers } from '@/data/index';

const columns = [
    {name: 'invoice', label: 'Invoice'},
    {name: 'invoiceDate', label: 'Invoice Date'},
    {name: 'noFakturPajak', label: 'No. Faktur Pajak'},
    {name: 'soldTo', label: 'Sold To'},
    {name: 'salesman', label: 'Salesman'},
    {name: 'kdSalesman', label: 'KD Salesman'},
    {name: 'name', label: 'Name'},
    {name: 'dpp', label: 'DPP'},
    {name: 'ppn', label: 'PPN'},
    {name: 'total', label: 'Total'},
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
        label: 'Customer',
        name: 'customer',
        component: 'select',
        options: customers,
        placeholder: 'Choose One',
    }
]

const customer = 'PT ABC'
const templateData = [
    { id: 1, invoice:'NB001', invoiceDate: '2023-01-01', noFakturPajak:'PO-001', soldTo: customer, salesman: '2023-01-01', kdSalesman: 'NSJ-001', name: 'nacme1', dpp: '1000', ppn: '100', total: '9000' },
    { id: 2, invoice:'NB002', invoiceDate: '2022-01-01', noFakturPajak:'PO-002', soldTo: customer, salesman: '2022-01-01', kdSalesman: 'NSJ-002', name: 'nacme2', dpp: '2000', ppn: '100', total: '1900' },
    { id: 3, invoice:'NB003', invoiceDate: '2022-06-01', noFakturPajak:'PO-003', soldTo: customer, salesman: '2022-06-01', kdSalesman: 'NSJ-003', name: 'nacme3', dpp: '3000', ppn: '100', total: '2900' },
];

</script>
<template>
    <VDatatable 
        :filters="filterFields"
        :columns="columns"
        :template-data="templateData"
        url="salesReportPerCustomers"
    />
</template>