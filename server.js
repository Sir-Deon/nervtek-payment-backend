const server = require('express')()
const cors  = require('cors')
let port = process.env.PORT || 5000
server.use(cors())


server.get('/', (req, res) => {
    res.send("Nervtek payment backend")
})
server.get('/callback',(res, req) =>{
    console.log(req.url);
})

server.get('/checkpay',(req, res) => {

})
server.listen(port, () => {
    console.log(`server started at port: ${port}`);
})