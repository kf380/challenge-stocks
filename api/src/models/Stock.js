const {DataTypes} = require('sequelize');

module.exports =(sequelize)=>{
    sequelize.define('stock',{
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        currency:{
            type: DataTypes.STRING,
            allowNull:false
        },
        symbol:{
            type: DataTypes.STRING,
            allowNull:false
        }


    })
}