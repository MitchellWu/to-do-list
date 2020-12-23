const express = require("express");
const bodyParser = require("body-parser");
const sqLite3 = require("sqlite3").verbose();

const app = express();
const port = 8080;

const dbName = "todoapp.db";

const db = new sqLite3.Database(`./${dbName}`, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`connected to ${dbName}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

//db.all function to return requests (is Promise function)
const passStatement = (sqlStatement) => {
  return new Promise((resolve, reject) => {
    db.all(sqlStatement, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

//get all data from table ToDoList w/ promise function
app.get("/api/get-list", (req, res) => {
  const sqlSelectAll = "SELECT * FROM ToDoList";
  const calldb = passStatement(sqlSelectAll);

  //in promise function
  passStatement(sqlSelectAll)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

//create a task and insert into database
app.post("/api/create-task", (req, res) => {
  //object destructuring
  const { Title, Description } = req.body;

  const sqlCreateTask = `INSERT INTO ToDoList(Title, Description) VALUES ('${Title}', '${Description}')`;
  const sqlSelectAll = "SELECT * FROM ToDoList";

  passStatement(sqlCreateTask)
    .then(() => {
      passStatement(sqlSelectAll)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/api/remove-task", (req, res) => {
  //removing a task from list
  const { ID, Title, Description } = req.body;

  const sqlRemoveTask = `DELETE FROM ToDoList WHERE ID='${ID}' AND Title='${Title}' AND Description='${Description}';`;
  const sqlSelectAll = "SELECT * FROM ToDoList";

  passStatement(sqlRemoveTask)
    .then(() => {
      passStatement(sqlSelectAll)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/hello-world-get", (req, res) => {
  res.send("hello world");
});

app.post("/api/hello-world-post", (req, res) => {
  res.send(req.body);
});
