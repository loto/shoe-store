<script setup>
import WebsocketButton from './WebsocketButton.vue'
const emit = defineEmits(['message-received'])

function onMessageReceived(message)
{
  emit('message-received', message)
}
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <img src="https://cdn-icons-png.flaticon.com/128/24/24697.png" width="32" height="64">
          </a>

          <div class="navbar-item">Aldo Shoe Inventory</div>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div class="navbar-menu">
          <div class="navbar-start">  
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <WebsocketButton @message-received="onMessageReceived" />
            </div>
          </div>
        </div>
      </nav>
</template>
