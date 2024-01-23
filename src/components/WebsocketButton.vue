<script setup>
import { ref } from 'vue'

const emit = defineEmits(['message-received'])
var socket = null
const buttonLabel = ref('Connect')
const isConnected = ref(false)
const isDisconnected = ref(true)

function click() {
    if (socket) {
        disconnect()
        buttonLabel.value = "Connect"
        isConnected.value = false
        isDisconnected.value = true

    } else {
        connect()
        buttonLabel.value = "Disconnect"
        isConnected.value = true
        isDisconnected.value = false
    }
}

function connect() {
    socket = new WebSocket('ws://localhost:8080')

    socket.addEventListener('open', (event) => {
        console.log("WebSocket connection opened: ", event);
    });

    socket.addEventListener('message', (event) => {
        console.log("WebSocket message received: ", event);
        emit('message-received', event)
    });

    socket.addEventListener('error', (event) => {
        console.log("WebSocket error received: ", event);
    });

    socket.addEventListener('close', (event) => {
        console.log("WebSocket connection closed: ", event);
    });
}

function disconnect() {
    if (socket) {
        socket.close()
        socket = null
    }
}
</script>

<template>
    <button @click="click" type="button" :class="{ 'is-success': isDisconnected, 'is-danger': isConnected }" class="button is-small">{{ buttonLabel }}</button>
</template>
