const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eyaye.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const projectCollection = client.db("project").collection("details");

    //App to get project
    app.get("/projects", async (req, res) => {
      const result = await projectCollection.find({}).toArray();
      res.send(result);
    });
    //
    //
    //Find Single Project
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // nothing changha
      const result = await projectCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("mongodb running");
//   // perform actions on the collection object
//   client.close();
// });

app.get("/", (req, res) => {
  res.send("Hello World! cheese dddddddddddddd");
});

run();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
