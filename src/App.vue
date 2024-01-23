<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModelReport from './components/ModelReport.vue';

const lastMessage = ref('')

function onMessageReceived(message)
{
  lastMessage.value = message.data
}
</script>

<template>
  <NavBar @message-received="onMessageReceived" />
  <hr class="mt-1 mb-1">
  <ModelReport :content="lastMessage" />
</template>
