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

exports.getAllBikes = async (req,res)=>{
   try {
    const data =  await Bike.find()
   res.status(200).json({
    message : "Bikes fetched successfully", 
    data : data
   })
   } catch (error) {
    res.status(500).json({
        message : error.message
    })
   }
}

exports.getBike = async(req,res)=>{
    const id = req.params.id
    const data = await Bike.findById(id)
    res.status(200).json({
        message : "Bike fetched successfully", 
        data : data
    })
}
exports.deleteBike = async(req,res)=>{
    const id = req.params.id 
    await Bike.findByIdAndDelete(id)
    res.status(200).json({
        message : "bike deleted successfully"
    })
}
exports.updateBike = async(req,res)=>{
    const id = req.params.id
    const {name,brand,price,description,category} = req.body
    await Bike.findByIdAndUpdate(id,{
        name, 
        brand, 
        price, 
        description,
        category
    })
    res.status(200).json({
        message : "Bike updated successfully"
    })
};