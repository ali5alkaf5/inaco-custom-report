<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { BaseInputMask, BaseModal, VTable, VTableFilters } from '@/components';
import { client } from '@/config';

type Column = {
    name: string,
    label: string,
    hide?: boolean,
}

const props = defineProps({
    filters: {
        type: Array<Object>,
        default: []
    }, 
    columns: {
        type: Array<Column>,
        default: []
    },
    url: {
        type: String,
        default: '',
    },
    templateData: {
        type: Array<Object>,
        default: [],
    }
});

const state = reactive({
    filters: {},
    searchTerm: '',
    data: [],
});

const atoms = reactive({
    isPrintModalOpen: false,
    isDownloadModalOpen: false,
});

const initDownload = function(){
    atoms.isDownloadModalOpen = true;
    setTimeout(()=>{
        atoms.isDownloadModalOpen = false;
    }, 3000);
}

const search = function(){
    client.search(props.url, {
        filter: state.filters,
        search: state.searchTerm
    }, function({data}: any){
        state.data = data;
    });
}

onMounted(() => {
    for(let filter of props.filters){
        // @ts-ignore
        if(!state.filters[filter.name]){
            // @ts-ignore
            state.filters[filter.name] = '';
        }
    }
    // @ts-ignore
    state.data = props.templateData;
    search();
});
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row justify-end">
            <div>
                <button
                    @click="atoms.isPrintModalOpen = true;"
                    class="btn-print btn-icon">
                    <i class="i-ph-printer"></i>
                </button>
                <button @click="initDownload()" class="btn-download btn-icon">
                    <i class="i-ph-download"></i>
                </button>
            </div>
        </div>
        <VTableFilters :fields="props.filters" v-model="state.filters" @submit="search"/>
        <div class="card card-template mt-2">
            <div class="card-header">
                <div class="w-full flex">
                    <div class="flex-grow">
                        <component
                            :is="BaseInputMask"
                            v-model="state.searchTerm"
                            label="Search"
                            name="search"
                            placeholder="input a search term"
                        ></component>
                    </div>
                    <button id="search" class="btn-sm btn-primary h-fit mt-auto" @click="search">Apply</button>
                </div>
            </div>
        
            <VTable
                :rowNumber="true"
                :columns="props.columns"
                :data="state.data"
                :per-page="10"
            />
        
        </div>
        <BaseModal
            :is-open="atoms.isDownloadModalOpen"
            size="sm"
        >
            <template #content>
                <div class="modal-download-progress max-h-90vh overflow-auto p-4">
                    <div class="space-y-8 mx-auto text-center">
                        <p>
                            Downloading... please wait
                        </p>
                    </div>
                </div>
            </template>
        </BaseModal>
        <BaseModal
            :is-open="atoms.isPrintModalOpen"
            size="full"
        >
            <template #content>
                <div class="modal-print-progress max-h-90vh overflow-auto p-4">
                    <h2 class="py-4 text-2xl font-bold">Lorem Ipsum</h2>
                    <div class="space-y-8">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. A accusantium provident,
                        blanditiis quam pariatur repellat? Animi ducimus fugit, similique libero et rem,
                        quod repellat sunt itaque voluptas nihil saepe laboriosam?
                    </p>
                    <button class="btn btn-primary btn-block" @click="atoms.isPrintModalOpen = false">Close</button>
                    </div>
                </div>
            </template>
        </BaseModal>
    </div>
</template>