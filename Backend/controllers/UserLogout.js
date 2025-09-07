async function UserLogout(req,res)
{
    try{
         res.clearCookie("token");

         res.json({
            mess:"logout successfully",
            errror:false,
            success:true,
            data:[]
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

module.exports=UserLogout;