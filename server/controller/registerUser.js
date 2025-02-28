const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')

async function registerUser(request,response){
    try {
        const { name, email, password,contactNumber } = request.body

        const checkEmail = await UserModel.findOne({ email }) 
        if(checkEmail){
            return response.status(400).json({
                message : "Already user exits",
                error : true,
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            contactNumber,
            profile_pic:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            password : hashedPassword
          });

        return response.status(201).json({
            message : "User created successfully",
            data : user,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = registerUser