import { reactive } from 'vue'

export const datasource = reactive({
    modelInventoryRecords: [],
    storeInventoryRecords : [],

    update(state) {
        this.updateModelInventoryRecords(state)
        this.updateStoreInventoryRecords(state)
    },

    findOrCreateModelInventoryRecord(model) {
        var modelRecord = this.modelInventoryRecords.find(el => el.model == model)
        if (modelRecord == undefined) {
            modelRecord = { 
                model: model, 
                inventory: [] ,
                findOrCreateStore: function(store) {
                    var storeRecord = this.inventory.find(el => el.store == store)
                    if (storeRecord == undefined) {
                        storeRecord = { store: store, count: 0 }
                        this.inventory.push(storeRecord)
                    }
                    return storeRecord
                },
                updateStoreInventory: function(store, count) {
                    let storeRecord = this.findOrCreateStore(store)
                    storeRecord.count = count
                }
            }
            this.modelInventoryRecords.push(modelRecord)
        }

        return modelRecord
    },

    updateModelInventoryRecords(state) {
        let modelRecord = this.findOrCreateModelInventoryRecord(state.model)
        modelRecord.updateStoreInventory(state.store, state.inventory)

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

    updateStoreInventoryRecords(state) {
        let storeRecord = this.storeInventoryRecords.find(el => el.store == state.store)
        if (storeRecord == undefined) {
            storeRecord = { store: state.store, inventory: [] }
            this.storeInventoryRecords.push(storeRecord)
        }
    
        let modelRecord = storeRecord.inventory.find(el => el.model == state.model)
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