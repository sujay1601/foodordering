
import { menuArray } from "./data.js"


const menuEl = document.getElementById('menu')
const orderEl = document.getElementById('order')
const totalEl = document.getElementById('total-order')
const totalPriceEl = document.getElementById('total-price')
const completeOrderEl = document.getElementById('complete-order')

let orderArray = []
let totalPrice = 0

document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        handleAddClick(e.target.dataset.id)
    }
    else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.id === 'complete-order-btn') {
        completeOrder()
    }
    else if (e.target.id === 'modal-close-btn') {
        modal.style.display = "none"
    }
    else if (e.target.id === 'submit-btn') {
        e.preventDefault()
        submitOrder()
    }
})

function handleAddClick(itemId) {
    let targetObject = menuArray.find(item => item.id == itemId)

    if (!orderArray.includes(targetObject)) {
        orderArray.push(targetObject)
        targetObject.quantity = 1
    }
    else {
        targetObject.quantity++
    }

    totalPrice += targetObject.price
    totalPriceEl.textContent = `$${totalPrice}`

    if (orderArray.length > 0) {
        orderEl.classList.remove('hidden')
        totalEl.classList.remove('hidden')
        totalPriceEl.classList.remove('hidden')
        completeOrderEl.classList.remove('hidden')
    }

    render()
}

function handleRemoveClick(itemId) {
    let targetObject = menuArray.find(item => item.id == itemId)

    if (targetObject.quantity > 1) {
        targetObject.quantity--
    }
    else {
        orderArray = orderArray.filter(item => item.id != itemId)
    }

    totalPrice -= targetObject.price
    totalPriceEl.textContent = `$${totalPrice}`

    if (orderArray.length < 1) {
        orderEl.classList.add('hidden')
        totalEl.classList.add('hidden')
        totalPriceEl.classList.add('hidden')
        completeOrderEl.classList.add('hidden')
    }

    render()
}      

function renderMenu() {
    let menuHtml = ''

    menuArray.forEach((item) => {
        menuHtml += `
            <div class="item">
                <div class="emoji">
                    <p class="emoji-item">${item.emoji}</p>
                </div>
                <div class="item-info">
                    <p class="item-name" id="name">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <div class="add-btn">
                    <button 
                        class="item-add"
                        id="item-add"
                        data-id="${item.id}"
                    >+</button>
                </div>
            </div>
            `
        })

    return menuHtml
}

function getOrderHtml() {
    let orderHtml = `<h2 class="order-title">Your order</h2>`
    
    orderArray.forEach((item) => {
        
        orderHtml += `
        <div class="order">
            <div class="order-items">
                <div class="order-item">
                    <div class="item-remove">
                        <p class="item-name">${item.name}</p>
                        <button class="remove-btn" id="remove-btn" data-remove="${item.id}">Remove</button>
                    </div>
                    <p class="item-quantity">${item.quantity}</p>
                    <p class="item-price">$${item.price * item.quantity}</p>
                </div>
            </div>
        </div>
        
        `
    })
    return orderHtml
}

function completeOrder() {
    modal.style.display = "block"
}

function submitOrder() {

    if (cname.value && cnumber.value && cvv.value) {
        modal.style.display = "none"
        orderEl.classList.add('hidden')
        document.getElementById("total-order").innerHTML = `<h3 class="thank-you">Thank you, ${cname.value}, for your order😀</h3>`
    }
    else {
        document.getElementById('error-msg').textContent = `Please complete the form.`
    }

    render()
}

function render() {
    menuEl.innerHTML = renderMenu()
    orderEl.innerHTML = getOrderHtml()
}

render()
