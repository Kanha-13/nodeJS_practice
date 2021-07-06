const http = require('http')
const PORT = process.env.PORT || 1312
const { getData, getDataById, addNewData, updateData, deleteData } = require('./controller/controller')
const server = http.createServer((req, res) => {
    if (req.url === '/data' && req.method === 'GET') {
        getData(req, res)
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