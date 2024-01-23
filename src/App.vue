<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModelReport from './components/ModelReport.vue'
import StoreReport from './components/StoreReport.vue'

const lastMessage = ref('')

function onMessageReceived(message)
{
  lastMessage.value = JSON.parse(message.data)
}
</script>

<template>
  <NavBar @message-received="onMessageReceived" />
  <hr class="mt-1 mb-1">
  <ModelReport :content="lastMessage" />
  <StoreReport :content="lastMessage" />
</template>
