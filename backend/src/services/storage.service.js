const ImageKit=require("@imagekit/nodejs")  


const ImageKitClient=new ImageKit({
    privateKey:process.env.IMAGE_PRIVATE_KEY,
    publicKey:process.env.IMAGE_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGE_URL_ENDPOINT
   
}) 


async function uploadFile(file){
   
   
    const result=await ImageKitClient.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"musicplayerbackend/music"  

    }) 
    return result

} 

module.exports = { uploadFile };

