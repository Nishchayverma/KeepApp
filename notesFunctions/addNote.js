import {random_color} from '../utils.js'
import {colorData} from '../constants/constants.js'
import { localStorageSetter } from '../utils.js';
import { showNotes } from './showNotes.js'


const noteTag = document.getElementsByClassName('note-input')[0]
document.getElementById('noteBtnId').addEventListener('click', addNewNote)
let noteContentIdValue = 0;
export function addNewNote() {
    const noteValue = document.getElementsByClassName('note-input')[0].value
    if (noteValue !== '') {

        const allNotesFromNoteValue = []
        if (noteValue.includes("\n")) {
            const allNotesValues = noteValue.split("\n")
            allNotesValues.map(val => {
                allNotesFromNoteValue.push({
                    noteContentId: (notesData.length + 1) * 100 + noteContentIdValue,
                    noteDescription: val,
                    isNoteCompleted: false
                })
                noteContentIdValue++;
            })

        }
        else {
            allNotesFromNoteValue.push({
                noteContentId: (notesData.length + 1) * 100 + noteContentIdValue,
                noteDescription: noteValue,
                isNoteCompleted: false
            })
            noteContentIdValue++;
        }
        const noteData = {
            id: notesData.length + 1,
            categoryId: currentCategoryId,
            noteContent: allNotesFromNoteValue,
            noteCheckBox: false,
            noteColor: random_color(colorData)
        }
        notesData.push(noteData)
        noteTag.value = ""

    }
    console.log(notesData)
    localStorageSetter("notesData", notesData)
    showNotes()
}