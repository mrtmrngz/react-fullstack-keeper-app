import db from '../libs/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register_control = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const checkUserForUsername = await db.user.findUnique({
            where: {username}
        })

        if(checkUserForUsername) return res.status(403).json({error: "User already exist!"})

        const checkUserForEmail = await db.user.findUnique({
            where: {email}
        })

        if(checkUserForEmail) return res.status(403).json({error: "User already exist!"})

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        return res.status(201).json({message: "User created successfully"})

    }catch (err) {
        res.status(500).json({error: `Internal Server Error ${err}`})
    }
}

export const login_control = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await db.user.findUnique({
            where: {email}
        })

        if(!user) return res.status(404).json({error: "Invalid Credentials"})

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) return res.status(404).json({error: "Invalid Credentials"})

        const jwtToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie('jwt', jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).status(200).json({message: "Login successful"})

    }catch (err) {
        res.status(500).json({error: `Internal Server Error ${err}`})
    }
}

export const logout_control = async (req, res) => {
    try {
        res.clearCookie('jwt').status(200).json({message: "Logout Successful"})
    }catch (err) {
        res.status(500).json({error: `Internal Server Error ${err}`})
    }
}