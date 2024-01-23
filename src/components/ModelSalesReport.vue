<script setup>
defineProps({
    content: {
        type: Array
    }
})
</script>

<template>
    <h1 class="title is-6 mt-4">Shoe Model Aggregate Sales Report</h1>
    
    <table class="table is-striped is-hoverable">
        <thead>
        <tr>
            <th>Model</th>
            <th>Sales</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="record in content" :key="record.model" :class="{ 'has-background-success': record.updated > 0 }">
                <td>
                    {{ record.model }}
                </td>
                <td>
                    {{ record.sales.reduce((acc, record) => acc + record.value, 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
