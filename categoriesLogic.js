import {localStorageSetter,localStorageGetter} from './utils.js'
import {categoriesData as catData} from './constants/constants.js'
import {showNotes} from './notesFunctions/showNotes.js'

window.addEventListener("load",displayAllCategories)
document.getElementById('catBtnId').addEventListener('click',addNewCategory)
document.getElementById('categoryFormId').addEventListener("submit",(e)=>{
    e.preventDefault();
    addNewCategory();
})


const allCategories = document.getElementsByClassName('cat-all')[0];
let categoriesData = localStorageGetter("categoriesData") ||  catData
localStorageSetter("categoriesData",categoriesData)


export function displayAllCategories(){
    categoriesData.map(category=>{
        displayCategory(category.id,category.categoryName)
    })
}

export function displayCategory(catId,catText){
    const catItem = document.createElement("li")
    catItem.classList.add("category-items")
    if(catId===currentCategoryId){
        catItem.classList.add("active")
    }
    catItem.innerText= catText
    catItem.addEventListener("click",()=>{
       removePreviousActiveClasses()
        catItem.classList.add("active")
        currentCategoryId = catId
        showNotes()
    })
    allCategories.appendChild(catItem)
}

export function removePreviousActiveClasses(){
    const catItemToRemoveActive = document.querySelectorAll('.active')[0]
    catItemToRemoveActive.classList.remove('active')
}

export function addNewCategory(){
    const categoryInput = document.getElementsByClassName('cat-input')[0].value;
    if(categoryInput!==''){
        const newId = categoriesData[categoriesData.length-1].id + 1
        categoriesData.push({id:newId,categoryName:categoryInput})
        removePreviousActiveClasses()
        currentCategoryId = newId
        displayCategory(newId,categoryInput)
        document.getElementsByClassName('cat-input')[0].value=""
        localStorageSetter("categoriesData",categoriesData)
        showNotes()
        document.getElementsByClassName('note-input')[0].focus()
    }
    
}

export function changeCurrentCategory(catId){
    currentCategoryId=catId
}