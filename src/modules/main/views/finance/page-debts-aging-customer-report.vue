<script setup lang="ts">
import { VDatatable } from '@/components';
import { customers } from '@/data/index';

const columns = [
    {name: 'customerID', label: 'Cust ID'},
    {name: 'name', label: 'Name'},
    {name: 'invoice', label: 'Invoice'},
    {name: 'invoiceDate', label: 'Invoice Date'},
    {name: 'description', label: 'Description'},
    {name: 'dpp', label: 'DPP'},
    {name: 'ppn', label: 'PPN'},
    {name: 'totalInvoice', label: 'Total Invoice'},
    {name: 'payment', label: 'Payment'},
    {name: 'debitMemo', label: 'Debit Memo'},
    {name: 'cn', label: 'CN'},
    {name: 'remaining', label: 'Remaining'},
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
    },
]

const templateData = [
    { id: 1, customerID: 'wr1', name:'NB001', invoice: 'in1', invoiceDate: '2023-01-01', description:'PO-001', dpp: 'supplier1', ppn: '2023-01-01', totalInvoice: 'NSJ-001', payment: 'nacme1', debitMemo: '1000', cn: 'nacme1', remaining: '1000' },
    { id: 2, customerID: 'wr2', name:'NB002', invoice: 'in2', invoiceDate: '2022-01-01', description:'PO-002', dpp: 'supplier2', ppn: '2022-01-01', totalInvoice: 'NSJ-002', payment: 'nacme2', debitMemo: '2000', cn: 'nacme2', remaining: '2000' },
    { id: 3, customerID: 'wr3', name:'NB003', invoice: 'in3', invoiceDate: '2022-06-01', description:'PO-003', dpp: 'supplier3', ppn: '2022-06-01', totalInvoice: 'NSJ-003', payment: 'nacme3', debitMemo: '3000', cn: 'nacme3', remaining: '3000' },
];
</script>
<template>
    <VDatatable 
        :filters="filterFields"
        :columns="columns"
        url="debtsAgingReportPerCustomers"
        :template-data="templateData"
    />
</template>