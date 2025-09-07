const mongoose=require("mongoose")

async function connectdb()
{
    try{
    await mongoose.connect(process.env.MONGO_URI);
        console.log("success ");

    }
    catch(err)
    {
        console.log("error in connecting the mongodb ",err);
    }
}

module.exports=connectdb;