const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middlewear 
app.use(cors());
app.use(express.json());


// Connection url
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@simpletodo.zspgl.mongodb.net/?retryWrites=true&w=majority`;

// Create mongodb client 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run () {
    try{
        // Connecting client
        await client.connect();

        // Collection 
        const todosCollection = await client.db('SimpleTodo').collection('Todos');

        // Get 
        app.get('/todos', async (req, res) => {
            const todos = await todosCollection.find().toArray();
            res.send(todos);
        });

        // post 
        app.post('/todo/add', async (req, res) => {
            const newTodo = req.body;
            const result = await todosCollection.insertOne(newTodo);
            res.send(result);
        });

        // delete 
        app.delete('/todo/delete/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await todosCollection.deleteOne(filter);
            res.send(result);
        });

        // Get data by Id 
        app.get('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await todosCollection.findOne(filter);
            console.log(result);
            res.send(result);
        });

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Note Taker App');
})
  
app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
})