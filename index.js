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

  if (dbData && dbData.bio && dbData.name) {
    dbModel
      .insert(req.body)
      .then(dbs => {
        res.send({ Message: "Created", ...dbs });
      })
      .catch(error => {
        res.send(error);
      });
  } else {
    res.status(400);
    res.send({ errorMessage: "Please provide name and bio for the user." });
  }
});

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
  res.send("get users by id");
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (id >= 0) {
    dbModel
      .findById(id)
      .then(dbs => {
        res.status(200).json(dbs);
      })
      .catch(error => {
        res.status(500);
        res.send({ error: "The user informaitno could not be retrieved." });
      });
  }else{
      res.status(500).json({message: "No id has been chosen"})
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if(id >= 0) {
  dbModel
    .remove(id)
    .then(dbs => {
      res.status(200).json(dbs);
    })
    .catch(error => {
        res.status(404);
        res.send({message: "The user with the specified ID does not exist."})
      });
    }else{

        res.status(404).json({message: "No id has been chosen"})
    }
  });

server.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedDbModel = req.body;

    if(dbModel["user" + id] !=null){
    //update data
        dbModel['user' + id] = updatedDbModels;
    
        console.log("update Successfully, customers: \n" + JSON.stringify(dbModel, null, 4))
        //return
        res.end("Update Successfully! \n" + JSON.stringify(updatedDbModel, null, 4));
        }else{
        res.end("Doesn't Exist:\n" + JSON.stringify(updatedDbModel, null, 4));
        }
    });

const port = 8000;
server.listen(port, () => console.log(`\nserver running\n`));
