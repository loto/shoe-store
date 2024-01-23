<script setup>
import { onUpdated } from 'vue'

const props = defineProps({
    content: {
        type: Object
    }
})
var records = []

onUpdated(() => {
  updateData(props.content)
})

function updateData(content)
{
    var modelRecord = records.find(el => el.model == content.model)
    if (modelRecord == undefined) {
        modelRecord = { model: content.model, inventory: [] }
        records.push(modelRecord)
    }

    var storeRecord = modelRecord.inventory.find(el => el.store == content.store)
    if (storeRecord == undefined) {
        storeRecord = { store: content.store, count: 0 }
        modelRecord.inventory.push(storeRecord)
    }

    storeRecord.count = content.inventory

    records.sort((a, b) => {
        const nameA = a.model
        const nameB = b.model
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    })
}
</script>

<template>
    <h1 class="title is-6 mt-4">Shoe Model Aggregate Report</h1>
    
    <table class="table is-striped is-narrow is-hoverable">
        <thead>
        <tr>
            <th>Model</th>
            <th>Inventory</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="record in records" :key="record.model">
                <td>
                    {{ record.model }}
                </td>
                <td>
                    {{ record.inventory.reduce((acc, record) => acc + record.count, 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
