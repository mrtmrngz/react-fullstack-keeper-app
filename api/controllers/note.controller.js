import db from "../libs/db.js";

export const create_note = async (req, res) => {
    const {title, description, isMarked} = req.body
    try {
        const newNote = await db.note.create({
            data: {
                title,
                description,
                isMarked,
                userId: req.userId
            }
        })

        res.status(201).json({message: "Note created successfully", note: newNote})
    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const get_notes = async (req, res) => {
    try {
        const notes = await db.note.findMany({
            where: {userId: req.userId}
        })

        res.status(200).json(notes)
    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const get_notes_count = async (req, res) => {
    try {
        const allNotesCount = await db.note.count({
            where: {userId: req.userId}
        })

        const markedNotesCount = await db.note.count({
            where: {isMarked: true, userId: req.userId}
        })

        res.status(200).json({allNotesCount, markedNotesCount})
    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const get_marked_notes = async (req, res) => {
    try {
        const notes = await db.note.findMany({
            where: {
                isMarked: true,
                userId: req.userId
            }
        })

        res.status(200).json(notes)
    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const get_note = async (req, res) => {

    const noteId = req.params.id
    const userId = req.userId

    try {
        const note = await db.note.findUnique({
            where: {id: noteId}
        })

        if(note.userId !== userId) {
            return res.status(403).json({error: "Unauthorized!"})
        }

        res.status(200).json(note)
    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const update_note = async (req, res) => {
    const {title, description, isMarked} = req.body
    const userId = req.userId
    const noteId = req.params.id
    try {
        const note = await db.note.findUnique({
            where: {
                id: noteId,
                userId: userId
            }
        })

        if(!note) return res.status(404).json({error: "Note not found!"})

        const updatedNote = await db.note.update({
            where: {id: noteId},
            data: {
                title,
                description,
                isMarked
            }
        })

        return res.status(200).json({message: "Note updated successfully", updatedNote})

    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const change_marked_status = async (req, res) => {
    const userId = req.userId
    const noteId = req.params.id
    try {
        const note = await db.note.findUnique({
            where: {
                id: noteId,
            }
        })

        if(!note) return res.status(404).json({error: "Note not found!"})

        if(note.userId !== userId) {
            return res.status(403).json({error: "Unauthorized!"})
        }

        const updatedNote = await db.note.update({
            where: {id: noteId},
            data: {
                isMarked: !note.isMarked
            }
        })

        return res.status(200).json({message: "Note updated successfully", updatedNote})

    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}

export const delete_note = async (req, res) => {
    const userId = req.userId
    const noteId = req.params.id
    try {
        const note = await db.note.findUnique({
            where: {
                id: noteId,
                userId: userId
            }
        })

        if(!note) return res.status(404).json({error: "Note not found!"})

        const deletedNote = await db.note.delete({
            where: {
                id: noteId,
                userId: userId
            }
        })
        
        res.status(200).json({message: "Note deleted successfully", deletedNote})
    }catch (err) {
        res.status(500).json({error: `Internal Server Error: ${err}`})
    }
}