const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password)  {

    const exists =  await this.findone({email})

    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)


    const user = await this.create({email, password: hash})

    return user



}

module.exports = mongoose.model("user", userSchema)