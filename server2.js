const http = require('http')
const fetch = require('node-fetch')
const axios = require('axios')
const PORT = process.env.PORT || 2000
const { getData, getDataById, addNewData, updateData, deleteData } = require('./controller/controller')
const server = http.createServer((req, res) => {
    if (req.url === '/data' && req.method === 'GET') {
        fetch('http://localhost:1312/data').then(res => res.json()).then(json =>
            res.writeHead(201, { "Content-Type": "application/json" })
                .end(JSON.stringify(json)))
    }
    else if (req.url.match(/\/data\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getDataById(req, res, id)
    }
    else if (req.url === '/data' && req.method === 'POST') {
        addNewData(req, res)
    }
    else if (req.url.match(/\/data\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        updateData(req, res, id)
    }
    else if (req.url.match(/\/data\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        deleteData(req, res, id)
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify({ message: "Invalid route" }))
    }
})
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})