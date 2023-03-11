const express = require('express');
const router = express.Router();
const fs = require("fs");   //läsa och skriva till olika filer
const crypto = require("crypto-js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.json(users);
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    res.send(data)
    return;
  }
  )
});

router.get('/:userId', function(req, res, next) {
  userId = req.params.userId;
  console.log(userId);

  let findUser = users.find(user => user.id == userId);

  res.json(findUser);
});

router.post('/', function(req, res, next) {
  let newUser = { name: req.body.name };
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data)
    newUser.id = users.length + 1;
    let passwordToSave = crypto.SHA3(req.body.password).toString();
   // let passwordToSave = crypto.AES.encrypt(req.body.password, salt).toString();
    newUser.password = passwordToSave;
    users.push(newUser);
    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
      if(err) {
        console.log(err)
      }
      res.json(users)
    })
  })
});

router.post('/login', function(req, res, next) {
  const { name, password } = req.body;
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data);
    const foundUser = users.find(user => user.name === name);
    if(crypto.SHA3(password).toString() === foundUser.password) {
   // if(password === crypto.AES.decrypt(foundUser.password, salt).toString(crypto.enc.Utf8)) {
      res.status(201).json({name: foundUser.name, id: foundUser.id})
    }
    else {
      res.status(401).json("Incorrect password or username")
    }
    return;
  }
  )
  

  
});

router.get('/test', function(req, res, next) {
  res.send('test routen');
});

module.exports = router;