const {Schema, model} = require("mongoose");

const serviceSchema= new Schema({
    name:{
        type:String, reqired:true},
    description:{
        type:String, reqired:true},
    price:{
        type:String, reqired:true},
    provider:{
        type:String, reqired:true},
    }
);

const Service = new model("Service", serviceSchema);

module.exports = Service;
