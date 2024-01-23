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
    var storeRecord = records.find(el => el.store == content.store)
    if (storeRecord == undefined) {
        storeRecord = { store: content.store, inventory: [] }
        records.push(storeRecord)
    }

    var modelRecord = storeRecord.inventory.find(el => el.model == content.model)
    if (modelRecord == undefined) {
        modelRecord = { model: content.model, count: 0 }
        storeRecord.inventory.push(modelRecord)
    }

    modelRecord.count = content.inventory

    records.sort((a, b) => {
        const nameA = a.store
        const nameB = b.store
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
    <h1 class="title is-6 mt-4">Store Aggregate Report</h1>

    <table class="table is-striped is-narrow is-hoverable">
        <thead>
        <tr>
            <th>Store</th>
            <th>Inventory</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="record in records" :key="record.store">
                <td>
                    {{ record.store }}
                </td>
                <td>
                    {{ record.inventory.reduce((acc, record) => acc + record.count, 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
