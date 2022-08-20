let lable = document.getElementById("lable")
let shopingCart = document.getElementById("shoping-cart")


// Taking all selected data from local storage of index.js to here cart.js
let basket = JSON.parse(localStorage.getItem("data")) || []

// console.log(shopItems);

let calculation = () => {
    let cartIcon = document.getElementById("card_amount")
    cartIcon.innerHTML = basket.map((x) => { return x.item }).reduce((pre, nxt) => { return pre + nxt }, 0)
}
calculation()


let generateCartItems = () => {
    if (basket.length !== 0) {
        // used map for rendaring items according to basket array which has object{id ,item} selected from first page
        return (shopingCart.innerHTML = basket.map((x) => {
            //    console.log(x);
            let { id, item } = x

            // comparing basket id to database(shopItems) id . if id's same then on behalf of id rendaring card items
            let search = shopItems.find((y) => y.id === id)||[];

            let {img , name , price} = search
            return `  
             <div class="cart-items">
                <img width="100" src=${img} alt=""/>
            <div class="details">  
            <div class="title-price-x">
                <h4>
                    <p>${name}</p>
                    <span>$ ${price}</span>
                </h4>
                <div class="red" onClick="removeItem(${id})" >X</div>
            </div>

            <div class="button">
                <i onClick="decrement(${id})" class="bi bi-dash"></i>
                <div id=${id} class="quantity">
                ${item}
                </div>
                <i onClick="increment(${id})" class="bi bi-plus"></i>
        </div>
            <h3>${item * price}</h3>

            </div>
            
            
            </div>
            `
        }).join(""))
    } else {
        shopingCart.innerHTML = ``
        lable.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="homebtn" >Back to Home</button>
        </a>
        `
    }
}
generateCartItems()




let increment = (id) => {
    let selectedItem = id

    let search = basket.find((x) => { return x.id === selectedItem })
    if (search === undefined) {

        basket.push({
            id: selectedItem,
            item: 1
        })
    } else {
        search.item += 1
    }

    update(selectedItem)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

 
let decrement = (id) => {
    let selectedItem = id

    let search = basket.find((x) => { return x.id === selectedItem })
    if (search === undefined) {
        return
    }
    else if (search.item === 0) {
        return 
    } else {
        search.item -= 1
    }
    update(selectedItem)
    basket = basket.filter((x) => { return x.item !== 0 })
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))

}
// responsible for updating number on page
let update = (id) => {
    let search = basket.find((x) => { return x.id === id })
    document.getElementById(id).innerHTML = search.item
    calculation()
    // TotalAmount()
}


let removeItem = (id) => {
    let selectedItem = id
    // console.log(selectedItem);
    basket = basket.filter((x) => x.id !== selectedItem)
    generateCartItems()
    calculation()
    TotalAmount()
    localStorage.setItem("data", JSON.stringify(basket))
}


let TotalAmount = () => {
    if (basket.length !== 0) {
        let amountSearch = basket.map((x) => {
            let { id, item } = x
            let search = shopItems.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((pre, next) => { return pre + next }, 0)
        // console.log(amountSearch);
        lable.innerHTML = `
        <h2>Total Bill : $${amountSearch}</h2>
        <button class="checkout">Checkout</button>
        <button class="removeAll" onClick="clearCartAll()" >Cleart Cart</button>
        `
    } else return
}
TotalAmount()


let clearCartAll = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}
