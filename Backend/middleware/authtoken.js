const jwt=require("jsonwebtoken")
async function authtoken(req,res,next)
{
    try
    {
        let token = req.cookies?.token;
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.slice(7);
            }
        }
        if (!token) {
            return res.json({
                mess: "user not login",
                error: true,
                success: false
            });
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log("error in authtoken ", err);
                return res.json({
                    mess: "Invalid token",
                    error: true,
                    success: false
                });
            }
            req.user = decoded;
            next();
        });


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
module.exports=authtoken;