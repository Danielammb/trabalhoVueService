const express = require("express");
const mongodb = require('mongodb');
const router = express.Router();

const uri = "mongodb+srv://vueUser:1234@cluster0.yxtz6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
});
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
});
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
       _id: new mongodb.ObjectID(req.params.id),
    })
    res.status(201).send();
});
async function loadPostsCollection(){
    await client.connect();
   return client.db('vue_express').collection('posts');
}
module.exports = router;