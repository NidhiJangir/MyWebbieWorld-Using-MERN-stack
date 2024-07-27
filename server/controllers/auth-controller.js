const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try{
        res.status(200).send("Welcome to this page(using Controller)");
    
    }catch(error) {
        console.log(error);
    }
}
//user registration logic

const register = async (req,res) => {
    try{
        
        const {username, email,phone, password } = req.body;
       
        const userExist = await User.findOne({email});
       
        if(userExist){
        return res.status(400).json({message : "Email already exists"});
       }

       //to hash the password

       const userCreated = await User.create({username, email, phone, password});


        res.status(201).json({
        msg : "Registration Successful", 
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
     });

    }catch(error){
        res.status(400).json("internal server error");
    }
};


//User login logic

const login = async (req,res) => {
    try {
        const { email, password }=req.body;

        const userExist= await User.findOne({email});
        console.log(userExist);
        if(!userExist){
          return res.status(400).json({message: "Invalid Credential" }); 
        }

        const user= await userExist.comparePassword(password);


         if(user) {
            res.status(200).json({
                msg : "Login Successful", 
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
             });
         } else{
            res.status(401).json({message: "Invalid email or password"});
         }

    } catch (error) {
        res.status(500).json("internal server error");

    }
};

const user = async (req,res) =>{
    try {
        const userData= req.user;
        console.log(userData);
        return res.status(200).json({userData});
        // res.status(200).json({msg: "hi user"});
        
    } catch (error) {
        console.log('error from the route ${error}' );
    }
}



module.exports = { home ,register, login, user};