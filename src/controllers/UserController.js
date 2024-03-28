const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        const isCheckEmail = reg.test(email)
        if (! name || !email || !password || !confirmPassword || !phone ){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmpassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch (err){
        return res.status(404).json({
            message: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        const isCheckEmail = reg.test(email)
        if (! name || !email || !password || !confirmPassword || !phone ){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmpassword'
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    }
    catch (err){
        return res.status(404).json({
            message: err
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        console.log('userId', userId)
        if (!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user ID is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }
    catch (err){
        return res.status(404).json({
            message: err
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser
}
