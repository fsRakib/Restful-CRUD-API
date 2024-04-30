const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.get('/', (req, res) => {
    res.send('Hello Restful CRUD API')
})

app.get('/blog', (req, res) => {
    res.send('I am Rakib')
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch {
        res.status(500).json({ message: error.message })
    }
})

//up[date]
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //can not find
        if (!product) {
            return res.status(404).json({ message: `cannot find any nproduct with ID ${id}` })
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//delete a product 
app.delete('/products/:id', async(req, res)=>{
    try{
        const {id}=req.params;
        const product =await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:admin@cluster0.g374shy.mongodb.net/')
    .then(() => {
        app.listen(3000, () => {
            console.log(`Restful CRUD API is running on port 3000`)
        })
        console.log('connected to MongoDB')
    }).catch(() => {
        console.log('error')
    })