import { reactive } from 'vue'

export const datasource = reactive({
    modelInventoryRecords: [],
    storeInventoryRecords : [],

    update(state) {
        this.updatemodelInventoryRecords(state)
        this.updatestoreInventoryRecords(state)
    },

    updatemodelInventoryRecords(state) {
        var modelRecord = this.modelInventoryRecords.find(el => el.model == state.model)
        if (modelRecord == undefined) {
            modelRecord = { model: state.model, inventory: [] }
            this.modelInventoryRecords.push(modelRecord)
        }

        var storeRecord = modelRecord.inventory.find(el => el.store == state.store)
        if (storeRecord == undefined) {
            storeRecord = { store: state.store, count: 0 }
            modelRecord.inventory.push(storeRecord)
        }

        storeRecord.count = state.inventory

        this.modelInventoryRecords.sort((a, b) => {
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
    },

    updatestoreInventoryRecords(state) {
        var storeRecord = this.storeInventoryRecords.find(el => el.store == state.store)
        if (storeRecord == undefined) {
            storeRecord = { store: state.store, inventory: [] }
            this.storeInventoryRecords.push(storeRecord)
        }
    
        var modelRecord = storeRecord.inventory.find(el => el.model == state.model)
        if (modelRecord == undefined) {
            modelRecord = { model: state.model, count: 0 }
            storeRecord.inventory.push(modelRecord)
        }
    
        modelRecord.count = state.inventory
    
        this.storeInventoryRecords.sort((a, b) => {
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
    },
})