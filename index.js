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