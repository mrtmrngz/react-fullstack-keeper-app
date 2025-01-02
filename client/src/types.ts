import {RefObject} from "react";

export interface UserUpdateProps {
    username: string
    email: string
}

export interface UserTypesWithoutPassword extends UserUpdateProps{
    id: string
}

export interface UserRegisterProps extends UserUpdateProps{
    password: string
}

export interface UserLoginProps {
    email: string
    password: string
}

export type NoteTypesWithoutId = {
    title: string
    description: string
    isMarked: boolean
}

export type NoteTypesWithId = NoteTypesWithoutId & {
    id: string | number
}

export interface AddNoteModalProps {
    onOpen: boolean
    onClose: () => void
    modalRef: RefObject<HTMLDivElement>
}

export interface UpdateNoteModalProps extends AddNoteModalProps {
    editingRow: NoteTypesWithId | null
}

export interface GetNoteTypes extends NoteTypesWithId{
    createdAt: string
    updatedAt: string
}
