const fs = require('fs')
module.exports = {
    writeInFile: async (fileName, data) => {
        fs.writeFileSync(fileName, JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log("successful")
        })
    },
    getBodyData: async (req) => {
        return new Promise((resolve, reject) => {
            try {
                let body = ''
                req.on('data', (chunk) => {
                    body += chunk.toString()
                })
                req.on('end', async () => {
                    const finalParsedData = JSON.parse(body)
                    resolve(finalParsedData)
                })
            } catch (error) {
                reject(err)
            }
        })
    }
}