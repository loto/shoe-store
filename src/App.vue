<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModelReport from './components/ModelReport.vue'
import StoreReport from './components/StoreReport.vue'
import { SHOE_REPORT, STORE_REPORT } from "./constants"

const lastMessage = ref('')
const selectedReport = ref('')

function onMessageReceived(message) {
  lastMessage.value = JSON.parse(message.data)
}

function onReportSelected(type) {
  selectedReport.value = type
}
</script>

<template>
  <NavBar @message-received="onMessageReceived" @report-selected="onReportSelected" />
  <hr class="mt-1 mb-1">
  <ModelReport v-if="lastMessage && selectedReport == SHOE_REPORT" :content="lastMessage" />
  <StoreReport v-if="lastMessage && selectedReport == STORE_REPORT" :content="lastMessage" />
</template>
