<script setup>
import WebsocketButton from './WebsocketButton.vue'
import { SHOE_INVENTORY_REPORT, SHOE_SALES_REPORT, STORE_INVENTORY_REPORT } from "../constants"

const emit = defineEmits(['message-received', 'report-selected'])

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
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Select Aggregate Report</a>
      
              <div id="aggregate-menu" class="navbar-dropdown">
                <a class="navbar-item" @click="$emit('report-selected', SHOE_INVENTORY_REPORT)">Shoe Model Inventory</a>
                <a class="navbar-item" @click="$emit('report-selected', SHOE_SALES_REPORT)">Shoe Model Sales</a>
                <a class="navbar-item" @click="$emit('report-selected', STORE_INVENTORY_REPORT)">Store Inventory</a>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <WebsocketButton @message-received="onMessageReceived" />
            </div>
          </div>
        </div>
      </nav>
</template>
