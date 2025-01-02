import express from 'express'
import verifyToken from "../middlewares/verifyToken.js";
import {
    change_marked_status,
    create_note,
    delete_note, get_marked_notes,
    get_note,
    get_notes, get_notes_count,
    update_note
} from "../controllers/note.controller.js";

const router = express.Router()

router.get('/', verifyToken, get_notes)
router.get('/note-counts', verifyToken, get_notes_count)
router.get('/marked-notes', verifyToken, get_marked_notes)
router.get('/:id', verifyToken, get_note)
router.post('/', verifyToken, create_note)
router.put('/:id', verifyToken, update_note)
router.put('/change-marked/:id', verifyToken, change_marked_status)
router.delete('/:id', verifyToken, delete_note)

export default router