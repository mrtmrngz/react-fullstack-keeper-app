import db from "../libs/db.js";

export const user_info_control = async (req, res) => {
    const tokenUserId = req.userId
    try {
        const user = await db.user.findUnique({
            where: {id: tokenUserId}
        })

        if(!user) return res.status(404).json({error: "Unauthorized"})

        const {password, ...rest} = user

        res.status(200).json(rest)
    }catch (err) {
        res.status(500).json({error: `Internal Server Error ${err}`})
    }
}

export const user_update_control = async (req, res) => {
    const tokenUserId = req.userId
    const id = req.params.id
    const {username, email} = req.body

    if(tokenUserId !== id) {
        return res.status(401).json({error: "Unauthorized"})
    }

    if (!username || !email) {
        return res.status(400).json({ error: "Both username and email are required." });
    }

    try {
        const user = await db.user.findUnique({
            where: {id}
        })

        if(!user) return res.status(404).json({error: "User not found"})

        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    {username},
                    {email}
                ],
                NOT: {id: tokenUserId}
            }
        })

        if(existingUser) {
            return res.status(400).json({error: "Username or email address has already been taken by another user!"})
        }

        const updatedUser = await db.user.update({
            where: {id: tokenUserId},
            data: {
                username,
                email
            }
        })

        const {password, ...rest} = updatedUser

        res.status(200).json({message: "User updated successfully", updatedUser: rest})

    }catch (err) {
        res.status(500).json({error: `Internal Server Error ${err}`})
    }
}