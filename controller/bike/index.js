const Bike = require("../../model/bikeModel")


exports.addBike = async (req,res)=>{
    const {name,brand,description,category,price} = req.body 
    if(!name || !brand || !description || !category || !price){
        return res.status(400).json({
            message : "Please provide name,brand,description,category,price"
        })
    }
    await Bike.create({
        name, 
        brand, 
        description,
        category, 
        price
    })
    res.status(200).json({
        message : "Bike added successfully"
    })
}