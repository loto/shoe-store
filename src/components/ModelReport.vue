<script setup>
import { onUpdated } from 'vue'

const props = defineProps({
    content: {
        type: String
    }
})
var data = []

onUpdated(() => {
  updateData(JSON.parse(props.content))
})

function updateData(content)
{
    var modelRecord = data.find(el => el.model == content.model)
    if (modelRecord == undefined) {
        modelRecord = { model: content.model, inventory: [] }
        data.push(modelRecord)
    }

    var storeRecord = modelRecord.inventory.find(el => el.store == content.store)
    if (storeRecord == undefined) {
        storeRecord = { store: content.store, count: 0 }
        modelRecord.inventory.push(storeRecord)
    }

    storeRecord.count = content.inventory

    data.sort((a, b) => {
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
    <table class="table is-striped is-narrow is-hoverable">
        <thead>
        <tr>
            <th>Model</th>
            <th>Inventory</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="dataEvent in data" :key="dataEvent.model">
                <td>
                    {{ dataEvent.model }}
                </td>
                <td>
                    {{ dataEvent.inventory.reduce((acc, record) => acc + record.count, 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
