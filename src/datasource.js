import { reactive } from 'vue'

export const datasource = reactive({
    modelRecords: [],
    storeRecords : [],

    update(state) {
        this.updateModelRecords(state)
        this.updateStoreRecords(state)
    },

    updateModelRecords(state) {
        var modelRecord = this.modelRecords.find(el => el.model == state.model)
        if (modelRecord == undefined) {
            modelRecord = { model: state.model, inventory: [] }
            this.modelRecords.push(modelRecord)
        }

        var storeRecord = modelRecord.inventory.find(el => el.store == state.store)
        if (storeRecord == undefined) {
            storeRecord = { store: state.store, count: 0 }
            modelRecord.inventory.push(storeRecord)
        }

        storeRecord.count = state.inventory

        this.modelRecords.sort((a, b) => {
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

    updateStoreRecords(state) {
        var storeRecord = this.storeRecords.find(el => el.store == state.store)
        if (storeRecord == undefined) {
            storeRecord = { store: state.store, inventory: [] }
            this.storeRecords.push(storeRecord)
        }
    
        var modelRecord = storeRecord.inventory.find(el => el.model == state.model)
        if (modelRecord == undefined) {
            modelRecord = { model: state.model, count: 0 }
            storeRecord.inventory.push(modelRecord)
        }
    
        modelRecord.count = state.inventory
    
        this.storeRecords.sort((a, b) => {
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
})