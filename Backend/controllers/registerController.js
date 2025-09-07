const bcryptjs=require("bcryptjs")
const UserModel=require("../model/User")
async function registerController(req,res)
{
    try
    {
        const {username,email,password}=req.body;
        if(!username)
        {
            throw new Error("please provide the email");
        }
        
        if(!email)
        {
            throw new Error("please provide the email");
        }
        const userExist= await UserModel.findOne({email});
        if(userExist)
        {
            throw new Error("user already exist");
        }
        if(!password)
        {
            throw new Error("pplease prvide the passsword");
        }
        const salt=await bcryptjs.genSaltSync(10);
        const hashPassword=await bcryptjs.hashSync(password,salt);
        if(!hashPassword)
        {
            throw new Error("some thing went wrong in hashing the password");
        }
        const payload={
            ...req.body,
            password:hashPassword
        }
        
  const userdata=new UserModel(payload);
  const savedData=await userdata.save();

  res.status(201).json({
    data:savedData,
    success:true,
    error:false,
    message:"user is create"
   })


    }
    catch(err)
    {
        res.json({
            mess:err.message||err,
            error:true,
            success:false
        })
    }

}
module.exports=registerController;