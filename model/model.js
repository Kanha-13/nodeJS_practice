let data = require('../data.json')
const { writeInFile } = require('../utils/utils')
module.exports = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            const id_data = data.find((d) => d.id === id)
            resolve(id_data)
        })
    },
    addData: (newData) => {
        return new Promise((resolve, reject) => {
            const length = data.length
            const dataToAdd = { id: `${length + 1}`, ...newData }
            data.push(dataToAdd)
            writeInFile('./data.json', data)
            resolve(dataToAdd)
        })
    },
    update: async (id, dataToUpdate) => {
        return new Promise((resolve, reject) => {
            const index = data.findIndex((d) => d.id === id)
            data[index] = dataToUpdate
            writeInFile('./data.json', data)
            resolve(dataToUpdate)
        })
    },
    delete: async (id) => {
        return new Promise((resolve, reject) => {
            data = data.filter((d) => d.id != id)
            writeInFile('./data.json', data)
            resolve()
        })
    }
}