<script setup>
defineProps({
    content: {
        type: Array
    }
})
</script>

<template>
    <h1 class="title is-6 mt-4">Store Aggregate Report</h1>

    <table class="table is-striped is-hoverable">
        <thead>
        <tr>
            <th>Store</th>
            <th>Inventory</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="record in content" :key="record.store">
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
