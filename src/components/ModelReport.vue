<script setup>
defineProps({
    content: {
        type: Array
    }
})
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
            <tr v-for="record in content" :key="record.model">
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
