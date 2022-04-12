import { localStorageSetter, localStorageGetter } from './utils.js'


notesData = localStorageGetter("notesData") || []
localStorageSetter("notesData", notesData)
notesData = notesData.map(note => ({ ...note, noteCheckBox: false }))

console.log(notesData)




