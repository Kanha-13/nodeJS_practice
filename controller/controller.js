const Data = require('../model/model')
const { getBodyData } = require('../utils/utils')
module.exports = {
    getData: async (req, res) => {
        try {
            const data = await Data.findAll()
            res.writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify(data))
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
                .end(JSON.stringify(error))
        }
    },
    getDataById: async (req, res, id) => {
        try {
            const data = await Data.findById(id)
            if (!data) {
                res.writeHead(404, { "Content-Type": "application/json" })
                    .end(JSON.stringify({ message: "data not found" }))
            } else {
                res.writeHead(200, { "Content-Type": "application/json" })
                    .end(JSON.stringify(data))
            }
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
                .end(JSON.stringify(error))
        }
    },
    addNewData: async (req, res) => {
        try {
            const body = await getBodyData(req)
            const newData = {
                name: body.name,
                price: body.price
            }
            const dataToAdd = await Data.addData(newData)
            if (dataToAdd) {
                res.writeHead(201, { "Content-Type": "application/json" })
                    .end(JSON.stringify(dataToAdd))
            }
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
                .end(JSON.stringify(error))
        }
    },
    updateData: async (req, res, id) => {
        try {
            const old_data = await Data.findById(id)
            if (!old_data) res.writeHead(404, { "Content-Type": "application/json" })
                .end({ message: "Data not found" })
            const body = await getBodyData(req)
            console.log(old_data)
            const dataToUpdate = {
                id: old_data.id,
                name: body.name || old_data.name,
                price: body.price || old_data.price
            }
            await Data.update(id, dataToUpdate)
            res.writeHead(201, { "Content-Type": "application/json" })
                .end(JSON.stringify(dataToUpdate))
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
                .end(JSON.stringify(error))
        }
    },
    deleteData: async (req, res, id) => {
        try {
            const delete_data = await Data.findById(id)
            if (!delete_data) res.writeHead(404, { "Content-Type": "application/json" }).end((JSON.stringify("Data not found")))
            await Data.delete(id)
            res.writeHead(200, { "Content-Type": "application/json" })
                .end(`Data ${id} deleted`)
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
                .end(JSON.stringify(error))
        }
    }
}