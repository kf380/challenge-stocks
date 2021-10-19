const axios = require("axios");
const {User} = require ("../db");
exports.authLogin = async(req,res)=>{
    const {username, password} = req.body
    console.log(req.body,"useer")
    try {
        const user = await User.findOne({ where: { username: username } })
        
        if (!user) {
          return res.status(400).json({
            msg: "Username and Password not Found - Email",
          });
        }

        const validPassword = await User.findOne( { where: { password: password } } );

        if (!validPassword) {
            return res.status(400).json({
              msg: "Username and Password not Found - Password",
            });
          }

        res.json({
            msg: "POST login",
            user,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            msg: "contact the administrator",
          });
        }
       









}