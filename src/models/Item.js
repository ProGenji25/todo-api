/*

This file is for creating a Mongoose Model/Schema

*/
const db = require("../mongoose");
var itemSchema = new db.Schema({
    UserId : String,
    Text : String,
    Done : Boolean,
    Date : Date
});

var Item = db.model('Item', itemSchema, 'Item');

module.exports = Item;