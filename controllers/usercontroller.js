import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

    if(req.user.role == "admin"){//request eka admin ta samanada
        if(req.user != null){    //login admin kenekd
            if(req.user.role != "admin"){ //admmin kenekta asamanada
                res.status(403).json(
                    {massage : "you are not authorized to create an admin account.please login "}
                ) 
                return
            }


        }else{
        res.status(403).json(
            {massage : "you are not authorized to create an admin account.please login first "}
        ) 
              return
    }
    }


// Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

     // Create a new user
    const user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : hashedPassword,
        role : req.body.role
        

    })

    user.save().then(()=>{
        res.json(
            {message : "user added successfuly"}
        )
    }).catch(()=>{
        res.json(
            {message : "user added failed"}
        )
    })
}

export function loginUser(req, res){
    const email = req.body.email
    const password = req.body.password

    User.findOne({email : email}).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    massage : 'user not found'
                })
            }else{
                const isPasswordCorrect = bcrypt.compareSync(password, user.password)
                if (isPasswordCorrect){

                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        img : user.img
                    },
                    "batck-05-backend-2025"
                )
                    res.json({
                        massage : "login successfuly",
                        token : token
                    })
                }else{
                    res.status(404).json({
                        massage : "password is incorrect"
                    })
                }
            }
        }
    )

    
}


export function isAdmin(req){
    // if(req.user == null){
    //   res.status(403).json(
    //     {massage : "unauthorized"}    //this code purpus is have a admin in this login
    //   )
    //   return   //not run  return after under the code
    // }
    
    // if(req.user.role != "admin"){
    //   res.status(403).json(
    //     {massage : "you need to be an admin access"}
    //   )
    // }


    if(req.user == null){
    
      return false
    }
    
    if(req.user.role != "admin"){
        return false
    }
    return true
}