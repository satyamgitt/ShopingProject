let shop = document.getElementById("shop")




let basket = JSON.parse(localStorage.getItem("data")) || []
// responsible for showing shopItems dynamically on page
let generateShop = () => {
    return (shop.innerHTML = shopItems.map((x) => {

        let { id, name, des, price, img } = x

        let search = basket.find((x) => { return x.id === id }) || []
        return `<div id=product-${id} class="item">
<img width="220" src=${img} alt="image">
<div class="details">
    <h3>${name}</h3>
    <p>${des}</p>
    <div class="price-quqntity">
        <h2> $${price}</h2>
        <div class="button">
            <i onClick="decrement(${id})" class="bi bi-dash"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onClick="increment(${id})" class="bi bi-plus"></i>
        </div>
    </div>
</div>
</div>`
    }).join(""))
}
generateShop()


// responsible for increment
let increment = (id) => {
    let selectedItem = id

    // getting id onClick , if it available in basket then it's count increase otherwise push a id,item=1
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
    localStorage.setItem("data", JSON.stringify(basket))
}
// responsible for decrement
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
    // now on removing items when item == 0 that object removed and filter gave other remening objects inside array(basket)
    basket = basket.filter((x) => { return x.item !== 0 })
    localStorage.setItem("data", JSON.stringify(basket))

}
// responsible for updating number on page
let update = (id) => {
    let search = basket.find((x) => { return x.id === id })
    document.getElementById(id).innerHTML = search.item
    calculation()
}

// calculating and adding all increment and decrements operation in cart
let calculation = () => {
    let cartIcon = document.getElementById("card_amount")
    cartIcon.innerHTML = basket.map((x) => { return x.item }).reduce((pre, nxt) => { return pre + nxt }, 0)

}
calculation()