<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModelInventoryReport from './components/ModelInventoryReport.vue'
import ModelSalesReport from './components/ModelSalesReport.vue'
import StoreInventoryReport from './components/StoreInventoryReport.vue'
import { SHOE_INVENTORY_REPORT, SHOE_SALES_REPORT, STORE_INVENTORY_REPORT } from "./constants"
import { datasource } from './datasource'

const selectedReport = ref('')
const lastModelInventoryReport = ref('')
const lastModelSalesReport = ref('')
const lastStoreInventoryReport = ref('')

function onMessageReceived(message) {
  datasource.update(JSON.parse(message.data))
  lastModelInventoryReport.value = datasource.modelInventoryRecords
  lastModelSalesReport.value = datasource.modelSalesRecords
  lastStoreInventoryReport.value = datasource.storeInventoryRecords
}

function onReportSelected(type) {
  selectedReport.value = type
}
</script>

<template>
  <NavBar @message-received="onMessageReceived" @report-selected="onReportSelected" />
  <hr class="mt-1 mb-1">
  <ModelInventoryReport v-if="lastModelInventoryReport && selectedReport == SHOE_INVENTORY_REPORT" :content="lastModelInventoryReport" />
  <ModelSalesReport v-if="lastModelSalesReport && selectedReport == SHOE_SALES_REPORT" :content="lastModelSalesReport" />
  <StoreInventoryReport v-if="lastStoreInventoryReport && selectedReport == STORE_INVENTORY_REPORT" :content="lastStoreInventoryReport" />
</template>
