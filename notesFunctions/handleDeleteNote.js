import { localStorageSetter } from "../utils.js"
import { showNotes } from "./showNotes.js"
let newIds=1
export function handleDeleteNote(noteId) {
    notesData = notesData.filter(note => note.id !== noteId)
    notesData=notesData.map(note => ({...note,id: newIds++ }))
    localStorageSetter("notesData", notesData)
    showNotes()
}