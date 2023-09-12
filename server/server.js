const express = require('express');
const bodyParser =  require('body-parser');
const OpenAI = require('openai'); // Import OpenAI modules
const {MongoClient,ServerApiVersion} = require('mongodb');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const openai = new OpenAI({apiKey: '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'});

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

    const msg  = req.query.msg;
    const username = req.query.user;

    try
    {
        await client.connect();
        const db = client.db('murli');
        const col = db.collection("users");
       const user = await col.findOne({username});
       console.log(user);
       var count = user.credits;
       if(count==0)
       {
        return res.json({letter:"credits expired please buy new plan!"})
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
            content: `Acting as lord krishna,Give a solution to this problem ${msg} give references on basis of bhagwat geeta incidents,give output in form of a letter,And my name is ${name}`,
          },
        ],
      });
    
      console.log("AI request processed");
      
      var letter = completion.choices[0].message.content;
      console.log(username+":"+msg);
      console.log(username+":"+letter);
      res.json({letter})

})

app.listen(3000,()=>{
    console.log("Server started");
})