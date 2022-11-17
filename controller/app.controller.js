const student=require('../model/app.model')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
class appController{
  /**
   * 
   * @method: home
   * @discripation :open sign in page
   */
  async home(req,res)
  {
    res.render('home',{
      page_title:"sign in page",
      message:req.flash('message')
    })
  }
  /**
   * 
   * @method : getRegister
   * @desciption : open the register page
   */
  async getRegister(req,res)
  {
    try{
       res.render('register',{
        page_title:"Register page"
       })
    }catch(err)
    {
      throw err
    }
  }
  /**
   * 
   * @ method: register
   * @ desciption: user  register 
   */
  async register(req,res){
    try{
      req.body.name=req.body.name.trim();
      if(!req.body.name)
      {
        console.log("please enter valid input");
        res.redirect('/getRegister')
      }else{
     if(req.body.password===req.body.cpassword)
     {
      req.body.password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
      // console.log();
      const savaData=await student.create(req.body);
      {
        if(savaData && savaData._id){
          req.flash("message","Registation successfully !!!");
          console.log("Register successfully");
          res.redirect('/');
          // console.log(savaData);
        }else{
          console.log("Something is wrong");
          res.redirect('/getRegister')
        }
      }
     }else{
      console.log("password not matching");
      res.redirect('/getRegister')
     }
    }
  }catch(err){
      throw err
    }
  }

  /**
   * method: login 
   * @ description: user login and create a token and cookies
   */
  async login(req,res)
  {
    try{
      const isEmailExists=await student.findOne({email:req.body.email});
      if(isEmailExists)
      {
       
        const hashpassword=isEmailExists.password;
       
        if(bcrypt.compareSync(req.body.password,hashpassword))
        {
          const token=jwt.sign({
            email:req.body.email,
            id:req.body._id
          },"shitakash6617",{expiresIn:'30s'});
          // console.log(token);
          res.cookie("userToken",token);
          req.flash("message","Login successfully !!!");
          console.log("login successfully");
          res.redirect('/dashboard')
        }
        else{
          console.log("password not matching");
          res.redirect('/')
        }
      }
      else{
        console.log("user is not exists");
        res.redirect('/')
      }
    }catch(err)
    {
      throw err
    }
  }
  /**
   *@ method :Dashboard
   @ description : open dashboard
   */
  async dashboard(req,res){
    try{
        res.render('dashboard',{
          page_title:"dashboard",
          message:req.flash('message')
        })
    }catch(err){
      throw err
    }
  }
  async Auth(req,res,next){
    try{
       if(req.user)
       {
        next();
       }else{
        res.redirect('/')
       }
    }catch(err){
      throw err
    }
  }


  
  /**
   *@method :logout
   @description: user token & cookies remove
   */
  async logout(req,res)
  {
    try{
        // console.log(req.cookies);
        res.clearCookie('userToken');
        req.flash("message","Logout successfully !!!");
       res.redirect('/')
    }catch(err)
    {
      throw err
    }
  }
}
module.exports=new appController()
