// implement your API here

const express = require("express");

const dbModel = require("./data/db.js");

const server = express();

//MIDDLEWARE
//teach express how to read json from the request body
server.use(express.json()); //<<--- we need this for POST and PUT

server.post("/api/users", (req, res) => {
  const dbData = req.body;

  console.log("db data", dbData.bio, dbData.name);

  if (dbData && dbData.bio || dbData.name) {
    dbModel
      .insert()
      .then(dbs => {
        res.send({ Message: "Created", ...dbs });
      })
      .catch(error => {
        res.send(error);
      });
  }else{
    res.status(400);
    res.send({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.get("/api/users", (req, res) => {
    //order matters
  //first is the request
  //second is the response
  res.send("get users");

server.get("/api/users", (req, res) => {
  dbModel
    .find()
    .then(dbs => {
      res.send(dbs);
    })
    .catch(error => {
      res.status(500);
      res.send({ error: "The users information could not be retrieved" });
    });
});

server.get("api/users/:id", (req, res) => {
const id = req.params.id;
  
res.send("get users by id");

});
server.get("/api/users/:id", (req, res) => {
  dbModel
    .findById(id)
    .then(dbs => {
      res.send(dbs);
    })
    .catch(error => {
      res.status(500);
      res.send({ error: "The user informaitno could not be retrieved." });
        });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  dbsModel
    .remove(id)
    .then(dbs => {
      res.json(dbs);
    })
    .catch(error => {
      res
        .status(404)
        .json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;

  dbsModel
    .update(id)
    .then(dbs => {
      res.json(dbs);
    })
    .catch(error => {
      res.status(500).json({ message: "error updating the dbs id" });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\nserver running\n`));
