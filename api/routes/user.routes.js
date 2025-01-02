import express from 'express'
import {user_info_control, user_update_control} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router()

router.get("/user-info", verifyToken, user_info_control)
router.put("/:id", verifyToken, user_update_control)

export default router