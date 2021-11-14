const express = require("express");
const { v4 : uuidv4 } = require("uuid");

const route = express.Router();
const Department = require('../models/department.js');

const User = require('../models/user.js');
let users = [];

route.get("/", (req, res) => {
  res.send(users);
});

route.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`User with name ${user.id}`);
});

route.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  console.log(foundUser);
  res.send(foundUser);
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`the user have id ${id} have been delete`);
});

route.patch("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  const { firstName, lastName, age } = req.body;
  if (firstName) user.firstName = firstName;
  
  if (lastName) user.lastName = lastName;

  if (age) user.age = age;
  
  res.send(`User have id ${id} has been updated`);
});

route.get("/depart", (req, res) => {
  // const { id } = req.params;

  // const foundUser = users.find((user) => user.id === id);
  // console.log(foundUser);
  // res.send(foundUser);
  Department.find({}).then(function (departs) {
    res.send(departs);
    });
});
module.exports = route;
