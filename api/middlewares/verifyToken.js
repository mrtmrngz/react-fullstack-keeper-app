import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt

    if(!token) {
        return res.status(401).json({error: "Invalid Token"})
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {
        if(err) {
            return res.status(403).json({error: "Unauthorized"})
        }

        req.userId = payload.id
        next()
    })
}

export default verifyToken