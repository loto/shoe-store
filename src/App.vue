<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModelInventoryReport from './components/ModelInventoryReport.vue'
import StoreInventoryReport from './components/StoreInventoryReport.vue'
import { SHOE_REPORT, STORE_REPORT } from "./constants"
import { datasource } from './datasource'

const selectedReport = ref('')
const lastModelInventoryReport = ref('')
const lastStoreInventoryReport = ref('')

function onMessageReceived(message) {
  datasource.update(JSON.parse(message.data))
  lastModelInventoryReport.value = datasource.modelInventoryRecords
  lastStoreInventoryReport.value = datasource.storeInventoryRecords
}

function onReportSelected(type) {
  selectedReport.value = type
}
</script>

<template>
  <NavBar @message-received="onMessageReceived" @report-selected="onReportSelected" />
  <hr class="mt-1 mb-1">
  <ModelInventoryReport v-if="lastModelInventoryReport && selectedReport == SHOE_REPORT" :content="lastModelInventoryReport" />
  <StoreInventoryReport v-if="lastStoreInventoryReport && selectedReport == STORE_REPORT" :content="lastStoreInventoryReport" />
</template>
