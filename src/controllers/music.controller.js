const musicModel=require("../models/music.model") 
const { uploadFile } = require("../services/storage.service");
const albumModel=require("../models/album.model")

const jwt=require("jsonwebtoken")  



async function createMusic(req,res){
 
    const file=req.file; 



    if (!file) {
        return res.status(400).json({ message: "File not uploaded properly" });
    }
    
    const {title}=req.body 
  
   const result=await uploadFile(file.buffer.toString("base64"))  

 

    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
    }) 
    res.status(201).json({message:"Music created successfully",music})  


}

async function createAlbum(req,res){ 
 

    const {title,musics}=req.body
    const album=await albumModel.create({
        title,
        musics:musics,
        artist:req.user.id
    }) 
    res.status(201).json({message:"Album created successfully",album}) 



} 

async function getAllMusics(req,res){ 
    

    const musics=await musicModel.find().populate("artist","username email")

    res.status(200).json({message:"Musics fetched successfully",musics}) 

}

async function getAllAlbums(req,res){
    const albums=await albumModel.find().select("title artist ").populate("artist","username email")
    res.status(200).json({message:"Albums fetched successfully",albums})  

}

async function getAlbumById(req,res){
    const {albumId}=req.params 
    const album=await albumModel.findById(albumId).populate("artist","username email").populate("musics")
    res.status(200).json({message:"Album fetched successfully",album})
}

module.exports={createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumById} 