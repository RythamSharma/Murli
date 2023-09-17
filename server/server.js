const express = require('express');
const bodyParser =  require('body-parser');
const OpenAI = require('openai'); // Import OpenAI modules
const {MongoClient,ServerApiVersion} = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const password = "Navya#1427";
const enpassword = encodeURIComponent("Navya#1427");
const uri = `mongodb+srv://trickerbaby:${enpassword}@cluster0.rq5ucba.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    console.log("welcome to murli server")
    res.send("welcome to mulri");
})


app.get('/sendmessage',async (req,res)=>{

    const msg  = req.query.message;
    const username = req.query.username;
    const lang = req.query.language;

    try
    {
        await client.connect();
        const db = client.db('murli');
        const col = db.collection("users");
       const user = await col.findOne({username});

       if(user==null)
       {
        return res.json({letter:"Username not registered!,Please contact Developer Naman Sharma"});
       }
       
       console.log(user);
       var count = user.credits;
       if(count==0)
       {
        return res.json({letter:"credits expired please buy new plan!"});
       }
       
       count--;
       console.log(count)
       await col.updateOne({username},{$set:{credits: count.toString()}});
       var name = user.name;

    }
    catch(err)
    {
        console.log(err);
    }

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Acting as lord krishna,Give a solution to this problem ${msg} give references on basis of bhagwat geeta incidents,give output in form of a letter,And my name is ${name},Please reply in simple ${lang} language , do not use hard to understand words`,
          },
        ],
      });

      console.log("AI request processed");
      
      var letter = completion.choices[0].message.content;
      console.log(username+":"+msg);
      console.log(username+":"+letter);
      if(count!=0)
      res.json({letter});

})

app.listen(3003,()=>{
    console.log("Server started at 3003");
})