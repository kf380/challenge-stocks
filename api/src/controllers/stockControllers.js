const axios = require("axios");
const {Stock} = require ("../db");

exports.getStock = async(req,res)=>{
    let stocks =[];
    const dataStock = await axios.get("https://api.twelvedata.com/stocks?source=docs&exchange=NYSE")
    console.log(dataStock)
    const data = dataStock.data.data.map((stock)=>{
       return{
           name:stock.name, 
           symbol:stock.symbol,
           currency:stock.currency
       }
       

    })
    stocks.push(data)
    res.status(200).send(stocks)










}