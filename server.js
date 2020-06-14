const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

db.select('*').from('users').then(data => {
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//__________for autentication
app.get('/', (req, res) => { res.send('It is working') })
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// ROUTES

// get all todos
app.get("/todos", async (req, res) => {
    db.select('*').from('todo').then(todos => {
        console.log(todos);
        res.json(todos);
    })
});

// app.post('/todos', async (req, res) => {
//     db.transaction(trx => {
//         trx.insert({
//             description: description,
//         })
//             .into('todo')
//             .then(data => {
//                 return trx('todo')
//                     .returning('*')
//                     .insert({
//                         description: description,
//                     })
//                     .then(todo => {
//                         res.json(data);
//                     })
//             })
//     })
//         .catch(err => res.status(400).json('unable to add'))
// }
// )
  // create a todo
  app.post("/todos", async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );

      res.status(200).json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

//   // update a todo
//   app.put("/todos/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { description } = req.body;
//       await pool.query(
//         "UPDATE todo SET description = $1 WHERE todo_id = $2",
//         [description, id]
//       );

//       res.status(200).json("todo was updated");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

//   // delete a todo
//   app.delete("/todos/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//         id,
//       ]);
//       res.status(200).json("todo was deleted");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})