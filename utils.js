export function localStorageSetter(setKey,setValue)
{
    localStorage.setItem(setKey,JSON.stringify(setValue))
}

export function localStorageGetter(getKey){
    return JSON.parse(localStorage.getItem(getKey))
}

export function random_color(items)
{
   return items[Math.floor(Math.random()*items.length)];
}