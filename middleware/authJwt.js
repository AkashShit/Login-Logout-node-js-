const jwt=require('jsonwebtoken');
class Authjwt{
   async authjwt(req,res,next)
   {
    try{
          if(req.cookies && req.cookies.userToken)
          {
            jwt.verify(req.cookies.userToken,"shitakash6617",(err,data)=>{
               req.user=data;
               next()
            })
          }else{
            next()
          }
    }catch(err){
        throw err
    }
   } 

}
module.exports=new Authjwt();