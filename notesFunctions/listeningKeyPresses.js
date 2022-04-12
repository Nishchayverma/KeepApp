import { addNewNote } from "./addNote.js"

const keypressArr = []
const noteTag = document.getElementsByClassName('note-input')[0]
noteTag.addEventListener("keydown", (e) => {
    let key = e.key;
    if (keypressArr.length === 2) {
        keypressArr.shift()
    }
    keypressArr.push(key)
    if ('Shift' !== keypressArr[0] && 'Enter' === keypressArr[1]) {
        e.preventDefault()
        addNewNote()
    }

})