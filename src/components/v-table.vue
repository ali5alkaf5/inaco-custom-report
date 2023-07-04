<script setup lang="ts">
import { computed, reactive } from 'vue';
import { BaseCheckbox } from '.';


export type Column = {
    name: string,
    label: string,
    hide?: boolean,
}

export type Datum = Object & {
    id: any,
    [key: string]: any,
};

type CurrentState = {
    selectedRows: Array<any>,
    currentPage: number,
    totalPages: number,
    totalData: number,
};

const props = defineProps({
    columns: Array<Column>,
    selectable: {
        type: Boolean,
        default: false,
    },
    data: Array<Datum>,
    total: {
        type: Number,
        default: null,
    },
    perPage: {
        type: Number,
        default: 10,
    },
    rowNumber: {
        type: Boolean,
        default: false
    }
})

const dataLength = computed(()=>{
    return props.total ?? props.data?.length;
});
const paginations = computed(()=>{
    let items = [1];
    let length = dataLength.value / props.perPage;
    let i = 2;
    while(i <= length){
        items.push(i++);
    }
    return items;
});

const state = reactive<CurrentState>({
    selectedRows: [],
    currentPage: 1,
    totalPages: 3,
    totalData: 30,
});

const slicedData = computed(()=>{
    let curr = state.currentPage - 1;
    return (props.data ?? []).slice(curr * props.perPage, (curr + 1) * props.perPage);
});

const showing = computed(() => {

    let start = state.currentPage;
    let end = state.currentPage + props.perPage;
    if(end > dataLength.value){
        end = dataLength.value;
    }
    if(start > dataLength.value){
        start = dataLength.value;
    }

    return {
        start: start,
        end: end,
        total: dataLength.value,
    } 
});

const gotoPage = function(page: Number|null = null, increment: Number|null = null){
    if(typeof page === 'number'){
        state.currentPage = page;
    } else if(typeof increment === 'number'){
        let target = state.currentPage + increment;
        if(target >= 1 && target <= paginations.value.length){
            state.currentPage = target;
        }
    }
}

const selectRow = function(id: any){
    if(state.selectedRows.includes(id)){
        state.selectedRows.splice(state.selectedRows.indexOf(id), 1);
    } else {
        state.selectedRows.push(id);
    }
}

const toggleAllSelections = function(){
    if(state.selectedRows.length === dataLength.value){
        state.selectedRows = [];
    } else {
        state.selectedRows = props.data?.map(d => d.id) ?? [];
    }
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr class="basic-table-row bg-slate-100 dark:bg-slate-700">
                        <th v-if="selectable" class="basic-table-head text-center">
                            <BaseCheckbox theme="info" :model-value="state.selectedRows.length === dataLength" @click="toggleAllSelections" />
                        </th>
                        <th v-if="rowNumber" class="basic-table-head">No.</th>
                        <template v-for="column in columns" :key="column.name">
                            <th v-if="!column.hide" class="basic-table-head">
                                <div class="flex items-center justify-between">
                                    <p>{{ column.label }}</p>
                                </div>
                            </th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in slicedData" :key="item.id ?? index" class="basic-table-row">
                        <td v-if="selectable" class="basic-table-head text-center">
                            <BaseCheckbox theme="info" :model-value="state.selectedRows.includes(item.id)" @update:model-value="selectRow(item.id)" />
                        </td>
                        <td v-if="rowNumber" class="no basic-table-body">
                            {{ (index + 1) + ((state.currentPage - 1) * props.perPage) }}
                        </td>
                        <template v-for="column in columns" :key="column.name">
                            <td v-if="!column.hide" :class="'basic-table-body ' + column.name">{{ item[column.name] ?? '-' }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="w-full flex items-center justify-between">
            <div>
                <p class="text-sm text-slate-600 dark:text-slate-400">Showing {{showing.start}} to {{showing.end}} of {{showing.total}} entries</p>
            </div>
            <div class="btn-group">
                <button @click="gotoPage(null, -1)" type="button" class="previous-page-button btn btn-light-dark">
                    <i class="i-ph-caret-left"></i>
                </button>
                
                <button v-for="page in paginations" @click="gotoPage(page)" :key="page" type="button" class="page-number" :class="state.currentPage === page? ' active': ''">{{page}}</button>
                <button @click="gotoPage(null, 1)" type="button" class="next-page-button btn btn-light-dark">
                    <i class="i-ph-caret-right"></i>
                </button>
            </div>
        </div>
    </div>

</template>