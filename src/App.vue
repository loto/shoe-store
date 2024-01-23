<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModelReport from './components/ModelReport.vue'
import StoreReport from './components/StoreReport.vue'
import { SHOE_REPORT, STORE_REPORT } from "./constants"
import { datasource } from './datasource'

const selectedReport = ref('')
const lastModelReport = ref('')
const lastStoreReport = ref('')

function onMessageReceived(message) {
  datasource.update(JSON.parse(message.data))
  lastModelReport.value = datasource.modelInventoryRecords
  lastStoreReport.value = datasource.storeInventoryRecords
}

function onReportSelected(type) {
  selectedReport.value = type
}
</script>

<template>
  <NavBar @message-received="onMessageReceived" @report-selected="onReportSelected" />
  <hr class="mt-1 mb-1">
  <ModelReport v-if="lastModelReport && selectedReport == SHOE_REPORT" :content="lastModelReport" />
  <StoreReport v-if="lastStoreReport && selectedReport == STORE_REPORT" :content="lastStoreReport" />
</template>
