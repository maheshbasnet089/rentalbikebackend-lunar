const Bike = require("../../model/bikeModel")


exports.addBike = async (req,res)=>{
    console.log(req.user)
    const {name,brand,description,category,price} = req.body 
    let filename;
    if(!req.file){
        filename = "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1enVraSUyMGJpa2V8ZW58MHx8MHx8fDA%3D"
    }else{
        filename = req.file.filename
    }
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
        price, 
        image : filename
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