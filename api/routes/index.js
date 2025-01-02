import express from 'express'
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import noteRoute from "./note.route.js";

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/notes", noteRoute)

export default router