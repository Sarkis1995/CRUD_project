const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.Yelp_API);

require('dotenv').config()

app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine','ejs');

MongoClient.connect(process.env.DB_STRING, { 
    useUnifiedTopology: true
})
    .then(client =>{
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.post('/quotes',(req,res) => {
            quotesCollection.insertOne(req.body)
            .then(result=>{
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
            .then(results => {
            res.render('index.ejs', {quotes: results})
        })
            .catch(error => console.error(error))
        })
        app.delete('/quotes', (req, res) =>{
            quotesCollection.deleteOne(
                {name: String},
            )
            .then(result =>{
                if (result.deletedCount === 0){
                    return res.json('No quote to delete')
                }
                res.json(`Deleted quote`)
            })
            .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
    
    

app.use(bodyParser.urlencoded({ extended:true}));




app.listen(process.env.PORT, ()=>{
    console.log(`server is running`)
});