// import express from "express";
// import { MongoClient } from "mongodb";
// import { ObjectId } from "mongodb";
// const app = express();
// app.use(express.json());
// const encoded = encodeURIComponent("nabin@123"); //TO CHANGE
// const url = `mongodb+srv://nabinsudhar:${encoded}@cluster0.ajqcfsc.mongodb.net/`;
// let client;
// // const mangourl:nabin123@cluster0.ajqcfsc.mongodb.net/
// async function connect() {
//   try {
//     client = new MongoClient(url);
//     await client.connect();
//     console.log("database connected successfully");
//   } catch (e) {
//     console.log(e);
//   }
// }

// connect();

// app.get("/", function (req, res) {
//   res.send("hello world");
// });
// app.post("/post", async function (req, res) {
//   try {
//     const getPostman = req.body;
//     const sendMethod = await client
//       .db("CRUD")
//       .collection("data")
//       .insertOne(getPostman);
//     res.send("POSTED");
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/postmany", async function (req, res) {
//   try {
//     const getPostman = req.body;
//     const sendMethod = await client
//       .db("CRUD")
//       .collection("data")
//       .insertMany(getPostman);
//     res.send("POSTED");
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.get("/get", async function (req, res) {
//   try {
//     const sendMethod = await client
//       .db("CRUD")
//       .collection("data")
//       .get()
//       .toArray();
//     res.send(sendMethod);
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.get("/getone/:id", async function (req, res) {
//   try {
//     const sendMethod = await client

//       .db("CRUD")
//       .collection("data")
//       .getone()
//       .toArray();
//     res.send(sendMethod);
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.get("/findone/:id", async function (req, res) {
//   try {
//     const sendMethod = await client

//       .db("CRUD")
//       .collection("data")
//       .findOne()
//       .toArray();
//     res.send(sendMethod);
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.put("/update/:id", async function (req, res) {
//   try {
//     const sendMethod = await client;
//     const v = req.params.db("CRUD").collection("data").findOne().toArray();
//     res.updateOne(sendMethod);
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.delete("/delete/:id", async function (req, res) {
//   try {
//     const { id } = request.params;
//     const DeleteMethod = await client

//       .db("CRUD")
//       .collection("data")
//       .deleteOne()
//       .toArray();
//     res.deleteOne(sendMethod);
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.listen(4000, () => {
//   console.log("server connected successfully");
// });

//one more code
import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
   
    const url = `mongodb+srv://nabinsudhar:nabin123@cluster0.ajqcfsc.mongodb.net`;
    const client = new MongoClient(url);
    await client.connect();
    console.log("Database connected Succesfuly");


// connectDB();

// app.use(express.json());

// app.get("/", function (request, response) {
//   response.status(200).send("Hello World");
// });
app.use(express.json());
app.use(cors()); //to connect backend with frondend
const auth = (request,response,next) =>{
    try{
        const token = request.header("backend-token");
        jwt.verify(token,"student")
        next();
    }catch(e){
        console.log(e.message);
    }
}

app.post("/post", express.json(), async function (request, response) {
  const getPostman = request.body;
  const sendMethod = await client
    .db("CRUD")
    .collection("data")
    .insertOne(getPostman);
  console.log("movie added");
  response.status(201).send(sendMethod);
});

app.post("/postmany", express.json(), async function (request, response) {
  const getMany = request.body;
  const sendMethod = await client
    .db("CRUD")
    .collection("data")
    .insertMany(getMany);
  response.status(201).send(sendMethod);
});

app.get("/get", auth ,async function (request, response) {
  const getMethod = await client
    .db("CRUD")
    .collection("data")
    .find({})
    .toArray();
  response.status(200).send(getMethod);
});

app.get("/getone/:id", async function (request, response) {
  const { id } = request.params;
  const getMethod = await client
    .db("CRUD")
    .collection("data")
    .findOne({ _id: new ObjectId(id) });
  response.status(200).send(getMethod);
});

app.put("/update/:id", async function (request, response) {
  const { id } = request.params;
  const getPostman = request.body;
  const updateMethod = await client
    .db("CRUD")
    .collection("data")
    .updateOne({ _id: new ObjectId(id) }, { $set: getPostman });
  response.status(200).send(updateMethod);
});

app.put("/delete/:id", async function (request, response) {
  const { id } = request.params;
  const deleteMethod = await client
    .db("CRUD")
    .collection("data")
    .deleteOne({ _id: new ObjectId(id) }, { $set: getPostman });
  response.status(200).send(deleteMethod);
});

app.post("/register", async function (request, response) {
  const { username, email, password } = request.body;

  // Check if user with the provided email already exists
  const userFind = await client
    .db("CRUD")
    .collection("private")
    .findOne({ email: email });
  if (userFind) {
    response.send("Existing User");
  } else {
    // If user does not exist, insert new user into the database
    const salt = await bcrypt.genSalt(10); //convert 10 times
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const registerMethod = await client
      .db("CRUD")
      .collection("private")
      .insertOne({
        username: username,
        email: email,
        password: hashedPassword,
      });
    response.status(201).send(registerMethod); // Send response with status 201 (created)
  }
});
app.post("/login", async function (request, response) {
  const { email, password } = request.body;
  // console.log(email,password);
  // response.json({
  //    message: "hero is gained",
  //    username:email,
  //    password:password
  // })
  const userFind = await client
    .db("CRUD")
    .collection("private")
    .findOne({ email: email });
  // console.log(userFind);
  if (userFind) {
    const mongoDBpassword = userFind.password;
    const passwordCheck = await bcrypt.compare(password, mongoDBpassword);
    // console.log(passwordCheck);
    if (passwordCheck) {
      const token = jwt.sign({ id: userFind._id }, "student"); //jwt token student
      response.send({ token: token });
    } else {
      response.status(400).send("Invalid password");
    }
  } else {
    response.status(400).send("Invalid id");
  }
});

app.listen(4000, () => {
  console.log("Server connected successfully");
});
// app.put("/register",async function(request,response){
//     const getPostman =request.body;

//     const userFind = await client.db("CRUD").collection("private").findOne({email:email})
//     if(userFind){
//         response.send("Existing User")
//     }
//     else{}
//     const registerMethod = await client.db("CRUD").collection ("private")insertionOne(getPostman),password:password});
//      response.status(201).send(registerMethod)//while creating use 201

// })
