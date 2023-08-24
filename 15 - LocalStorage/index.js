const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];


function addItem(e) {
    e.preventDefault() //this is prevent 
    let text = (this.querySelector('[name=item]')).value
    const item = {
        text: text,
        done: false,
    }
    items.push(item)
    populateList(items, itemsList)
    localStorage.setItem('items', JSON.stringify(items))
    this.reset()
}

function toggleDone(e) {
    if(!e.target.matches('input')) return
    let el = e.target
    let index = el.dataset.index
    items[index].done = !items[index].done
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, index) => {
        return `
            <li>
            <input type="checkbox"
                data-index=${index} 
                id="item${index}" 
                ${plate.done ? 'checked' : ''}
                />
            <label for="item${index}">${plate.text}</labels>
            </li>
        `
    }).join('')
}
addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
populateList(items, itemsList)
