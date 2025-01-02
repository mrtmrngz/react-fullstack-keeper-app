import express from 'express'
import {login_control, logout_control, register_control} from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/register", register_control)
router.post("/login", login_control)
router.post("/logout", logout_control)

export default router