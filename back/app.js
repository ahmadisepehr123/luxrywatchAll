const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'sepehr1386',
      database : 'Watch'
    }
  });

  db.select('*').from('users').then(data => {
    console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req,res)=>{
    res.send(db);
})



app.post('/signin' , (req,res)=>{
           db.select('email' , 'hash').from('login')
           .where('email', '=' , req.body.email)
           .then(data =>{
            const isValid=bcrypt.compareSync(req.body.password , data[0].hash);
            if(isValid){
              return db.select('*').from('users')
                .where('email', '=' , req.body.email)
                .then(user =>{
                    res.json(user[0])
                })
                .catch(err => res.status(404).json('unable to find user!'))
                }else{
                  res.status(400).json('wrong password or email!')
          }
           })
           .catch(err => res.status(404).json('AN ERRO HAPPENED!'))
})

app.post('/register' , (req,res)=>{
   const {email,name,password} = req.body;
   const hash = bcrypt.hashSync(password);
   db.transaction(trx =>{
         trx.insert({
            hash:hash,
            email:email
         })
         .into('login')
         .returning('email')
         .then( loginEmail =>{
           return trx('users')
                .returning('*')
                .insert({
                    email : email,
                    name : name
                }).then(user =>{
                    res.json(user[0]);
                })
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })   
      .catch(err => res.status(404).json('unable to join! sorry'))
})

app.get('/profile/:id' , (req,res)=>{
  const {id} = req.params;
   db.select('*').from('users').where({id})
     .then(user =>{
     if(user.length){
      res.json(user[0]);
     }else{
      res.status(404).json("user not found!");
     }
   })
   .catch(err => res.status(404).json("An Error Happened!"));
})

app.listen(3002 , ()=>{
    console.log('app is running')
})







