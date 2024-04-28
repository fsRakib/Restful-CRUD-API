const express = require('express')
const app = express()

//routes
app.get('/',(req, res)=>{
    res.send('Hello Restful CRUD API')
})

app.listen(3000, ()=>{
    console.log(`Restful CRUD API is running on port 3000`)
})