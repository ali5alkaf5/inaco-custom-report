<script setup lang="ts">
import { VDatatable } from '@/components';
import { suppliers, warehouses, items } from '@/data/index';

const columns = [
    {name: 'warehouse', label: 'Warehouse'},
    {name: 'purchaseOrderNumber', label: 'Purchase Order Num'},
    {name: 'vendorNumber', label: 'Vendor No.'},
    {name: 'vendorName', label: 'Vendor Name'},
    {name: 'createDate', label: 'Create Date'},
    {name: 'noInvoice', label: 'No. Invoice'},
    {name: 'item', label: 'Item'},
    {name: 'itemDescription', label: 'Item Description'},
    {name: 'qtyVoucher', label: 'Qty Voucher'},
    {name: 'materialPriceConversion', label: 'Material Price Conv'},
    {name: 'discount', label: 'Discount'},
    {name: 'afterDiscount', label: 'After Discount'},
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
        label: 'Supplier',
        name: 'supplier',
        component: 'select',
        options: suppliers,
        placeholder: 'Choose One',
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
    { id: 1, purchaseOrderNumber:'NB001', warehouse: '2023-01-01', vendorNumber:'PO-001', vendorName: 'supplier1', createDate: '2023-01-01', noInvoice: 'NSJ-001', item: 'NFP-001', itemDescription: '1000', qtyVoucher: '100', materialPrice: '9000', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
    { id: 2, purchaseOrderNumber:'NB002', warehouse: '2022-01-01', vendorNumber:'PO-002', vendorName: 'supplier2', createDate: '2022-01-01', noInvoice: 'NSJ-002', item: 'NFP-002', itemDescription: '2000', qtyVoucher: '100', materialPrice: '1900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
    { id: 3, purchaseOrderNumber:'NB003', warehouse: '2022-06-01', vendorNumber:'PO-003', vendorName: 'supplier3', createDate: '2022-06-01', noInvoice: 'NSJ-003', item: 'NFP-003', itemDescription: '3000', qtyVoucher: '100', materialPrice: '2900', materialPriceConversion: '100',discount: '100', afterDiscount: '100', ppn: '100', total: '100', },
];

</script>
<template>
    <VDatatable 
        :filters="filterFields"
        :columns="columns"
        :template-data="templateData"
        url="purchaseReports"
    />
</template>