const express = require("express");
const mongoose = require("mongoose");

const Todo = require("./model/Todo");
var bodyParser = require("body-parser");
const app = express();

// connect to MongoDB
mongoose
  .connect("mongodb://localhost/todo-api")
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

// IMP for POST API calls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// IMP for Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/todos", (req, res) => {
  Todo.find(function(err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

// /* POST /todos */
app.post("/todos", function(req, res, next) {
  Todo.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
app.get("/todos/:id", function(req, res, next) {
  Todo.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
app.put("/todos/:id", function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
app.delete("/todos/:id", function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Dummy
app.get("/todos/users", (req, res) => {
  const customers = [
    { id: 1, firstName: "Sachin", lastName: "Sodi" },
    { id: 2, firstName: "Rahul", lastName: "Sharma" },
    { id: 3, firstName: "Romy", lastName: "Singh" }
  ];

  res.json(customers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
