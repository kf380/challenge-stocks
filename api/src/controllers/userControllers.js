const bcrypt = require('bcrypt');
const {User} = require ("../db");
const {Sequelize} = require('sequelize');
const { create } = require("domain");

exports.createUser =  async (req,res) =>{
    const {  username, password} = req.body;
    console.log(req.body,"Holaaa")
    
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const createUser = await User.create({
        username,
        password:hash
       

    });


    return res.status(200).send(createUser)



}


exports.getUser = async (req,res) =>{
    const user = await User.findAll();
    res.json(user)
}