var express = require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const salt = 10;
var app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
const mongoose = require("mongoose");
const cors = require("cors");
const person = require("./schemas/people");
const subgreddiit = require("./schemas/subgreddiit");
const follow = require("./schemas/followers_following");
const posts = require("./schemas/posts");
const Savedposts = require("./schemas/savedposts");
const { useNavigate } = require("react-router-dom");
const { response } = require("express");
app.use(cors());
app.listen(5000, () => {
  console.log("hello");
});
const JWT_SECRET = process.env.jwt;

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://yatharth_gupta1:GTinfo%402050@cluster0.czyc0cx.mongodb.net/assignment_1?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connection successful");
    // app.listen(3000);
  })
  .catch((err) => console.log(err));
const router = express.Router();

app.get("/mysubgreddiit/:id", function (req, res) {
  res.send(req.params.id);
});
app.use(router);

router.post("/signup", async (request, response) => {
  const {
    first_name,
    second_name,
    age,
    contact,
    username,
    email,
    password: plainTextPassword,
  } = request.body;
  console.log(request.body);
  const password = await bcrypt.hash(plainTextPassword, salt);
  console.log(password);
  try {
    // storing our user data into database
    const Person = new person({
      first_name: first_name,
      second_name: second_name,
      age: age,
      contact: contact,
      username: username,
      email: email,
      password: password,
    });
    const Follow = new follow({
      username: username,
      email: email,
    });
    Person.save();
    Follow.save((err, user1) => {
      if (err) return console.error(err);
      response.json(user1);
    });
    // return response.redirect("/");
  } catch (error) {
    // console.log(JSON.stringify(error));
    // if (error.code === 11000) {
    //   return res.send({ status: "error", error: "email already exists" });
    // }
    // throw error;
    console.log(error);
  }
});

router.post("/posts", async (request, response) => {
  const { name, des, email, username, topic, banned, tags, no_of_posts } =
    request.body;
  console.log(request.body);
  try {
    // storing our user data into database
    const Posts = new posts({
      topic: topic,
      username: username,
      email: email,
      upvotes: 0,
      downvotes: 0,
      Name: name,
      content: des,
      banned_keywords: banned,
      tags: tags,
    });

    Posts.save((err, user1) => {
      if (err) return console.error(err);
      response.json(user1);
    });
    subgreddiit
      .findOneAndUpdate(
        { Name: name },
        { $set: { no_of_posts: no_of_posts + 1 } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // return response.redirect("/");
  } catch (error) {
    // console.log(JSON.stringify(error));
    // if (error.code === 11000) {
    //   return res.send({ status: "error", error: "email already exists" });
    // }
    // throw error;
    console.log(error);
  }
});

const verifyUserLogin = async (email, password) => {
  console.log("he");
  console.log({ email, password });
  try {
    const user = await person.findOne({ email }).lean();
    console.log(user);
    if (!user) {
      return { status: "error", error: "user not found" };
    }
    if (await bcrypt.compare(password, user.password)) {
      // creating a JWT token
      token = jwt.sign(
        { id: user._id, username: user.email, type: "user" },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      return { status: "ok", data: user };
    }
    return { status: "error", error: "invalid password" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const response = await verifyUserLogin(email, password);
  if (response.status === "ok") {
    console.log(response);
    res.send(response);
  } else {
    res.json(response);
  }
});

router.post("/req_data", async (req, res) => {
  const Email = req.body.email;
  console.log(Email);
  person.findOne({ email: Email }, function (err, us) {
    res.send({
      message: 1,
      first_name: us.first_name,
      second_name: us.second_name,
      username: us.username,
      email: us.email,
      contact: us.contact,
      age: us.age,
    });
  });
});

router.post("/all_users", async (req, res) => {
  console.log(req.body);
  const per = await person.find({});
  return res.json(per);
});

router.post("/all_savedposts", async (req, res) => {
  const per = await Savedposts.find({});
  return res.json(per);
});

router.post("/findsub", async (req, res) => {
  console.log(req.body);
  const Name = req.body.Name;
  const per = await subgreddiit.findOne({ Name: Name });
  console.log(per);
  return res.send(per);
});

router.post("/showcomments", async (req, res) => {
  console.log(req.body);
  const Name = req.body.Name;
  const per = await posts.findOne({ _id: Name });
  console.log(per.comments);
  return res.send(per.comments);
});

router.post("/addcomment", async (req, res) => {
  console.log(req.body);
  const { text, name, username } = req.body;
  const per = await posts.findOneAndUpdate(
    { _id: name },
    { $push: { comments: { text, username } } }
  );
  console.log(per);
  return res.send(per);
});

router.post("/savepost", async (req, res) => {
  // console.log(req.body);
  const post = req.body;
  const Posts = new Savedposts({
    topic: post.topic,
    username: post.username,
    email: post.email,
    upvotes: post.upvotes,
    downvotes: post.downvotes,
    Name: post.Name,
    content: post.content,
    comments:post.comments,
    banned_keywords: post.banned_keywords,
    tags: post.tags,
  });
  try {
    const per = Posts.save()
    console.log(per);
    res.send(per)
  } catch (error) {
    console.log(error);
  }
});

router.post("/upvote", async (req, res) => {
  const { name, up } = req.body;
  posts
    .findOneAndUpdate({ _id: name }, { $set: { upvotes: up + 1 } })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/downvote", async (req, res) => {
  const { name, down } = req.body;
  posts
    .findOneAndUpdate({ _id: name }, { $set: { downvotes: down + 1 } })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send();
});

router.post("/findposts", async (req, res) => {
  console.log(req.body);
  const Name = req.body.Name;
  const per = await posts.find({ Name: Name });
  return res.send(per);
});

router.post("/findinsubg", async (req, res) => {
  console.log(req.body);
  const { name, username } = req.body;
  const per = await subgreddiit.findOne({ Name: name, followers: username });
  // const ab = await per.findOne({ followers: { $elemMatch: username } })
  console.log(per);
  return res.send(per);
});

router.post("/accept", async (req, res) => {
  console.log(req.body);
  const { name, username1 } = req.body;
  const per = await subgreddiit.findOneAndUpdate(
    { Name: name },
    { $push: { followers: username1 } }
  );
  const per1 = await subgreddiit.findOneAndUpdate(
    { Name: name },
    { $pull: { request: username1 } }
  );
  // const ab = await per.findOne({ followers: { $elemMatch: username } })
  console.log(per);
  return res.send(per);
});

router.post("/leave", async (req, res) => {
  console.log(req.body);
  const { name, username } = req.body;
  const per = await subgreddiit.findOneAndUpdate(
    { Name: name },
    { $push: { left: username } }
  );
  const per1 = await subgreddiit.findOneAndUpdate(
    { Name: name },
    { $pull: { followers: username } }
  );
  // const ab = await per.findOne({ followers: { $elemMatch: username } })
  if (per && per1) {
    console.log(per);
    return res.send(per);
  }
});

router.post("/reject", async (req, res) => {
  console.log(req.body);
  const { name, username1 } = req.body;
  const per = await subgreddiit.findOneAndUpdate(
    { Name: name },
    { $pull: { request: username1 } }
  );
  // const ab = await per.findOne({ followers: { $elemMatch: username } })
  console.log(per);
  return res.send(per);
});

router.post("/addinfollowing", async (req, res) => {
  console.log(req.body);
  const { email, email1 } = req.body;
  try {
    const user1 = await follow.findOneAndUpdate(
      { email: email },
      { $push: { following: email1 } },
      {
        new: true,
      }
    );
    const user2 = await follow.findOneAndUpdate(
      { email: email1 },
      { $push: { followers: email } },
      {
        new: true,
      }
    );
    console.log(user2);
    if (user1 && user2) {
      return res.send({ user1, user2 });
    }
  } catch (error) {
    throw error;
  }
});
router.post("/addinrequest", async (req, res) => {
  // console.log(req.body);
  // const { email, email1 } = req.body;
  const { name, username } = req.body;
  try {
    const user1 = await subgreddiit.findOneAndUpdate(
      { Name: name },
      { $push: { request: username } },
      {
        new: true,
      }
    );
    if (user1) {
      return res.send(user1);
    }
  } catch (error) {
    throw error;
  }
});
router.post("/deletesub", async (req, res) => {
  // console.log(req.body);
  // const { email, email1 } = req.body;
  const Name = req.body.Name;
  try {
    const user1 = await subgreddiit.deleteOne({ Name: Name });
    if (user1) {
      return res.send(user1);
    }
  } catch (error) {
    throw error;
  }
});

router.post("/deletepost", async (req, res) => {
  // console.log(req.body);
  // const { email, email1 } = req.body;
  const id1 = req.body.id1;
  try {
    const user1 = await Savedposts.deleteOne({ _id:id1 });
    if (user1) {
      return res.send(user1);
    }
  } catch (error) {
    throw error;
  }
});

router.post("/update", (req, res) => {
  const data = req.body.user;
  console.log(req.body);
  var message = 1;
  person.findOneAndUpdate({ email: data.email }, data, (err, us) => {});
  follow.findOneAndUpdate(
    { email: data.email },
    { username: data.username },
    (err, us) => {}
  );
  return res.send({ message });
});

router.post("/getfollowers", (req, res) => {
  const email = req.body.email;
  follow
    .find({ email: email })
    .then((response) => {
      console.log(response);
      console.log(response[0].followers);
      res.send(response[0].followers);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/getfollowing", (req, res) => {
  const email = req.body.email;
  follow
    .find({ email: email })
    .then((response) => {
      console.log(response);
      console.log(response[0].following);
      res.send(response[0].following);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/getusername", (req, res) => {
  const email = req.body.email;
  follow
    .find({ email: email })
    .then((response) => {
      console.log(response + "345");
      return res.send(response[0].username);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/getusername1", (req, res) => {
  const email = req.body.email;
  follow
    .find({ email: email })
    .then((response) => {
      console.log(response + "345");
      console.log(response[0].username);
      return res.send(response[0].username);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/mysubgreddiit", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const description = req.body.des;
  const Name = req.body.name;
  const moderator = { username, email };

  const Subgreddiit = new subgreddiit({
    moderator: [moderator],
    followers: [username],
    no_of_followers: 1,
    no_of_posts: 0,
    Name: Name,
    description: description,
  });
  Subgreddiit.save()
    .then((response) => {
      res.send(response);
    })
    .catch((Err) => {
      console.log(Err);
    });
});
router.post("/mysubgreddiitdata", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const all = await subgreddiit.find({
    moderator: { $elemMatch: { email: email } },
  });
  return res.json(all);
});

router.post("/allsubgreddiitdata", async (req, res) => {
  // const email = req.body.email
  const all = await subgreddiit.find({});
  return res.json(all);
});

router.post("/delete", async (req, res) => {
  const { email1, email } = req.body;
  console.log({ email, email1 });
  // const res1 = await follow.updateOne({email:email},{$pull:{following:email1}})
  // try{
  //   console.log(res1);
  //   res.send(res1)
  // }
  // catch(err){
  //   console.log(err)
  // }
  // follow.updateOne({email:email},{$pull:{following:email1}})
  // follow.updateOne({email:email1},{$pull:{followers:email}},function(err,us1){
  //   if(err) throw err;
  //   return res.send(us1)
  try {
    const user1 = await follow.updateOne(
      { email: email },
      { $pull: { following: email1 } }
    );
    const user2 = await follow.updateOne(
      { email: email1 },
      { $pull: { followers: email } }
    );
    console.log(user2);
    if (user1 && user2) {
      return res.send({ user1, user2 });
    }
  } catch (error) {
    throw error;
  }
  // const res2 =  follow.findOneAndUpdate({email:email1},{$pull:{followers:email}})
  // try{
  //   console.log(res1);
  // }
  // catch(err){
  //   console.log(err)
  // }
  // if(res1&&res2)
  // return res.send({message:1})
  // else
  // return res.send({message:0})
});
