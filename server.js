
const express = require('express');
const mongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv')
const result = dotenv.config();


// Initialise app 
const app = express();




const {
    port = 5000
} = process.env;

const dbURI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.vsgza.mongodb.net/test?retryWrites=true&w=majority`;


app.get('/', (req, res) => {
        const products = []

        mongoClient.connect(dbURI)
        .then(client => client.db("koral_stores").collection("products").find({}))
        .then(docs => {
            return docs.forEach(doc => {
                products.push(doc)
            }) }).then(workDone => {
                if(products.length > 0) {
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    res.json(JSON.stringify(products))
                }
                // Todo: Respond to bad request
            }).catch(error => {
                console.log(error);
                res.status(404).send('The Requested resource was not found')
            })
        })


// app.listen()
app.listen(port, () => {
    console.log(`Server has started listening on http://localhost:${port}`)
})