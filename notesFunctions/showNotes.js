import { localStorageSetter, localStorageGetter } from '../utils.js'
import { colorData } from '../constants/constants.js'
import { handleDeleteNote } from './handleDeleteNote.js'

let activeSelectionId = 1
let activeColorSelection = ''

window.addEventListener("load", showNotes)

function setNoteContent(content) {
    const noteText = document.createElement("span")
    noteText.style.display = "block"
    if (content.isNoteCompleted) {
        noteText.style.textDecoration = "line-through"
    }
    noteText.innerHTML = `${content.noteDescription}`
    return noteText
}

function setNoteCheckBox(content) {
    const noteDiv = document.createElement("div")
    const noteCheck = document.createElement("input")
    noteCheck.setAttribute("type", "checkbox")
    if (content.isNoteCompleted) {
        noteCheck.setAttribute("checked", "true")
    }
    noteCheck.addEventListener("change", () => {
        notesData = notesData.map(note => {
            const ob = note.noteContent.map(con => con.noteContentId === content.noteContentId
                ? { ...con, isNoteCompleted: !con.isNoteCompleted } : con)
            return { ...note, noteContent: ob }
        })
        console.log(notesData)
        showNotes()
        localStorageSetter("notesData", notesData)
    })
    noteCheck.setAttribute("id", content.noteContentId)
    noteDiv.appendChild(noteCheck)
    const noteText = document.createElement("span")
    noteText.innerHTML = content.noteDescription
    if (content.isNoteCompleted) {
        noteText.style.textDecoration = "line-through"
    }
    noteDiv.appendChild(noteText)
    return noteDiv
}


function showNoteCheckBox(noteId) {
    notesData = notesData.map(note => note.id === noteId ? { ...note, noteCheckBox: !note.noteCheckBox } : note)
    showNotes()
}



export function showNotes() {

    const notesAddingTag = document.getElementsByClassName("notes-to-add-Box")[0]
    const notesFrag = document.createDocumentFragment();
    while (notesAddingTag.hasChildNodes()) {
        notesAddingTag.removeChild(notesAddingTag.firstChild);
    }
    let notesToDisplay = notesData
    if (currentCategoryId !== 1) {
        notesToDisplay = notesData?.filter(note => note.categoryId === currentCategoryId)
    }
    if (notesToDisplay.length === 0) {
        const noNoteLine = document.createElement('h2')
        noNoteLine.innerHTML = "No notes in this category"
        notesAddingTag.appendChild(noNoteLine)
    }
    else {
        notesToDisplay.map(note => {
            let checkCompletedTaskTitleAdded = true
            let checkCompletedTaskTitleForCheckbox = true
            const noteBox = document.createElement('div')
            noteBox.classList.add("note-box")
            noteBox.style.background = note.noteColor
            const allCompletedTasks = document.createDocumentFragment()
            const allCompletedTasksForCheckBox = document.createDocumentFragment()
            note.noteContent.map(content => {

                if (note.noteCheckBox) {

                    let returnedItem = setNoteCheckBox(content)
                    noteBox.appendChild(returnedItem)

                }
                else {
                    if (content.isNoteCompleted && checkCompletedTaskTitleAdded) {
                        const isCompletedText = document.createElement('span')
                        isCompletedText.innerHTML = "Completed Tasks"
                        isCompletedText.style.textDecoration = "underline"
                        allCompletedTasks.appendChild(isCompletedText)
                        let returnedItem = setNoteContent(content)
                        allCompletedTasks.appendChild(returnedItem)
                        checkCompletedTaskTitleAdded = false
                    }
                    else if (content.isNoteCompleted) {
                        let returnedItem = setNoteContent(content)
                        allCompletedTasks.appendChild(returnedItem)
                    }
                    else {
                        let returnedItem = setNoteContent(content)
                        noteBox.appendChild(returnedItem)
                    }

                }
            })

            if (!checkCompletedTaskTitleAdded) {
                noteBox.appendChild(allCompletedTasks)
            }
            if (!checkCompletedTaskTitleForCheckbox) {
                console.log("hey1233123")
                noteBox.appendChild(allCompletedTasksForCheckBox)
            }

            const deleteBtn = document.createElement('i')
            deleteBtn.classList.add("material-icons")
            deleteBtn.classList.add("deleteNoteIcon")
            deleteBtn.innerHTML = "delete"
            deleteBtn.addEventListener("click", () => handleDeleteNote(note.id))
            noteBox.appendChild(deleteBtn)

            const checkBoxBtn = document.createElement('i')
            checkBoxBtn.classList.add("material-icons")
            checkBoxBtn.classList.add("checkBoxIcon")
            checkBoxBtn.innerHTML = "done"
            checkBoxBtn.addEventListener("click", () => showNoteCheckBox(note.id))
            noteBox.appendChild(checkBoxBtn)


            const catSelectionDrop = document.createElement('select')
            catSelectionDrop.addEventListener('click', () => {
                activeSelectionId = note.id
            })
            catSelectionDrop.classList.add("catSelection")
            catSelectionDrop.style.background = note.noteColor
            catSelectionDrop.addEventListener('change', (e) => {
                notesData = notesData.map(note => ({
                    ...note, categoryId: note.id === activeSelectionId
                        ? parseInt(e.target.value)
                        : note.categoryId
                }))
                localStorageSetter("notesData", notesData)
                console.log(notesData)
                showNotes()
            })
            const mainOption = localStorageGetter("categoriesData").find(cat => cat.id === note.categoryId)
            const catItem = document.createElement("option")
            catItem.innerHTML = mainOption.categoryName
            catItem.setAttribute("value", mainOption.id)
            catSelectionDrop.appendChild(catItem)

            localStorageGetter("categoriesData").map(cat => {
                if (cat.id !== mainOption.id) {
                    const catItem = document.createElement("option")
                    catItem.innerHTML = cat.categoryName
                    catItem.setAttribute("value", cat.id)
                    catSelectionDrop.appendChild(catItem)
                }
            })
            noteBox.appendChild(catSelectionDrop)


            const colorSelection = document.createElement('select')
            colorSelection.addEventListener('click', () => {
                activeColorSelection = note.id
            })

            colorSelection.classList.add("colorSelection")
            colorSelection.style.background = note.noteColor
            colorSelection.addEventListener('change', (e) => {
                notesData = notesData.map(note => ({
                    ...note, noteColor: note.id === activeColorSelection
                        ? e.target.value
                        : note.noteColor
                }))
                localStorageSetter("notesData", notesData)
                showNotes()
            })

            const colorItem = document.createElement("option")
            colorItem.innerHTML = "Select color"
            colorSelection.appendChild(colorItem)
            colorData.map(color => {
                const newColorItem = document.createElement('option')
                newColorItem.classList.add('colorItem')
                newColorItem.innerHTML = `${color}`
                newColorItem.style.background = color
                newColorItem.setAttribute("value", color)
                colorSelection.appendChild(newColorItem)
            })
            noteBox.appendChild(colorSelection)


            notesFrag.appendChild(noteBox)
        })
        notesAddingTag.appendChild(notesFrag)
    }
}