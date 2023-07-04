<script setup lang="ts">
import { VDatatable } from '@/components';
import { suppliers } from '@/data/index';

const columns = [
    {name: 'noBukti', label: 'No. Bukti'},
    {name: 'dateInvoice', label: 'Date Invoice'},
    {name: 'purchaseInvoice', label: 'Purchase Invoice'},
    {name: 'supplier', label: 'Supplier'},
    {name: 'noFaktur', label: 'No. Faktur'},
    {name: 'noSuratJalan', label: 'No. Surat Jalan'},
    {name: 'noFakturPajak', label: 'No. Faktur Pajak'},
    {name: 'dpp', label: 'DPP'},
    {name: 'ppn', label: 'PPN'},
    {name: 'total', label: 'Total'},
]

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
        label: 'Supplier',
        name: 'supplier',
        component: 'select',
        options: suppliers,
        placeholder: 'Choose One',
    }
]

const templateData = [
    { id: 1, noBukti:'NB001', dateInvoice: '2023-01-01', purchaseInvoice:'PO-001', supplier: 'supplier1', noFaktur: 'NF-001', noSuratJalan: 'NSJ-001', noFakturPajak: 'NFP-001', dpp: '1000', ppn: '100', total: '900' },
    { id: 2, noBukti:'NB002', dateInvoice: '2022-01-01', purchaseInvoice:'PO-002', supplier: 'supplier2', noFaktur: 'NF-002', noSuratJalan: 'NSJ-002', noFakturPajak: 'NFP-002', dpp: '2000', ppn: '100', total: '1900' },
    { id: 3, noBukti:'NB003', dateInvoice: '2022-06-01', purchaseInvoice:'PO-003', supplier: 'supplier3', noFaktur: 'NF-003', noSuratJalan: 'NSJ-003', noFakturPajak: 'NFP-003', dpp: '3000', ppn: '100', total: '2900' },
];
</script>
<template>
    <VDatatable 
        :filters="filterFields"
        :columns="columns"
        url="purchaseReportDetails"
        :template-data="templateData"
    />
</template>