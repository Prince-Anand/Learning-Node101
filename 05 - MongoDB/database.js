require("dotenv").config();
const { MongoClient } = require("mongodb");


const url = process.env.URL;

const client = new MongoClient(url);
const dbname = "Test";

async function main(){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection = db.collection("User");

    const data = {
        firstname: "John",
        lastname: "Doe",
        city: "New York",
        "Phone Number": 4578788
    }

    // Insert Data
    // const result = await collection.insertOne(data);
    // console.log("Inserted : ",data);

    // Read Data

    const findResult = await collection.find({}).toArray();
    console.log("Documents in Collection => ",findResult);

    return "done."
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());