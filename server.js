const server = require('express')()
const cors  = require('cors')
let port = process.env.PORT || 5000
server.use(cors())

server.get('/callback',(res, req) =>{
    console.log("heyyyyyyyy");
})

server.get('/checkpay',(req, res) => {

})
server.listen(port, () => {
    console.log(`server started at port: ${port}`);
})