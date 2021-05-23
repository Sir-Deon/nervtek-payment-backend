const server = require('express')()
const cors  = require('cors')
let port = process.env.PORT || 5000
server.use(cors())

let status = 'pending'

server.get('/', (req, res) => {
    res.send("Nervtek payment backend")
})
server.get('/callback',(req, res) =>{
   status = req.query.status
   console.log(status);
})

server.get('/checkpay',(req, res) => {
       if(status = "SUCCESSFUL"){
           res.json({
               success: true
           })
       }
})
server.listen(port, () => {
    console.log(`server started at port: ${port}`);
})