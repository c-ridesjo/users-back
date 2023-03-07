const express = require('express');
const router = express.Router();

let users = [
  {id: 1, name: 'John', password: "dog"},
  {id: 2, name: 'Jane', password: "cat"},
  {id: 3, name: 'Bob', password: "rabbit"},
  {id: 4, name: 'Alice', password: "horse"},
  {id: 5, name: 'Harry', password: "cow"}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);           // skickar users-arrayen som svar
});

router.get('/:userId', function(req, res, next) {   //hämta endast EN användare
  userId = req.params.userId;
  console.log(userId);

  let findUser = users.find(user => user.id == userId);

  res.json(findUser);           
});


router.post('/', function(req, res, next) {

  let newUser = req.body;   //hämtar värdet som är sparat i body och sparar det objektet i newUser
  newUser.id = users.length + 1;
  users.push(newUser);
  console.log(newUser);

  res.json({users});           // skickar users-arrayen som svar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
});


router.post('/login', function(req, res, next) {
  const { name, password } = req.body;
  const foundUser = users.find(user => user.name === name);

  if (password === foundUser.password) {
    res.status(201).json({name: foundUser.name, id: foundUser.id})
  } 
  else {
    res.status(401).json("Incorrect password or username")
  }
});

router.get('/test', function(req, res, next){
  res.send('testroutern');
}); 

module.exports = router;
