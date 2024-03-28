const User =require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken } = require("./JwtService")
const { generalRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword: hash,
                phone
            })
            if (createdUser){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        }
        catch (err){
            reject(err)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log('comparePassword', comparePassword)
            if(!comparePassword) {
                resolve({
                status: 'OK',
                message: 'The user or password is incorrect',
            })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        }
        //}
        catch (err){
            reject(err)
        }
    })
}

const updateUser = (id, data) => {
    console.log('hi')
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser', checkUser)
            if (checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            const updatedUser =await User.findByIdAndUpdate(id, data)
            console.log('updatedUser', updateUser)

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        }
        //}
        catch (err){
            reject(err)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser
}
