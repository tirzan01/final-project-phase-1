
    const prices = []
    
    function totalPriceCalculator() {
        let totalPrices = prices.map(e => parseInt(e.replace('$', '')))
        document.getElementById('totalPrice').innerText = `$${totalPrices.reduce((curr, acc) => curr + acc, 0)}.00`
    }

document.addEventListener('DOMContentLoaded', () => {

    
    const stars = document.querySelectorAll('.emptyStar')

    for (let i = 0; i < stars.length; i++) {
        for (let x  = i; x < stars.length; x++) {
            stars[i].addEventListener('click', () => {
                for (let x = 0; x < stars.length; x++) {
                    if(x <= i){
                        stars[x].innerHTML = '<img src = "/images/fullStar.png"></img>'            
                        stars[x].classList.remove('emptyStar')
                        stars[x].classList.add('fullStar')
                    }else{
                        stars[x].innerHTML = '<img src = "/images/emptyStar.png"></img>'            
                        stars[x].classList.remove('fullStar')
                        stars[x].classList.add('emptyStar')
                    }                  
                }
            })
        }
    }

    class Item {
        constructor(name, price, img) {
            this.name = name
            this.img = img
            this.price = price
        }

        addToOrder() {
            document.getElementById(`${this.name}`).addEventListener('click', e => {
                let orderedItem = document.createElement('p')
                let button = document.createElement('button')
                button.classList.add('removeItem')
                button.innerText = 'x'
                orderedItem.innerHTML +=
                `<span class = 'addedItemName'>${this.name}</span><span class = 'addedItemPrice'>${this.price}</span>`
                prices.push(this.price)
                orderedItem.appendChild(button)
                document.getElementById('selectedItems').appendChild(orderedItem)
                button.addEventListener('click', e => {
                     orderedItem.remove()
                     for (let i = 0; i < prices.length; i++) {
                        if(this.price === prices[i]){
                            prices.splice(i, 1)
                            console.log(prices)
                            break
                        }
                     }
                     totalPriceCalculator()
                })
                totalPriceCalculator()
            })
        }
    }

    const margherita = new Item ('Margherita', '$25', '/images/margherita.jpg')
    const marinara = new Item ('Marinara', '$22', '/images/marinara.jpg')
    const prosciutto = new Item ('Prosciutto', '$28', '/images/prosciutto.jpg')
    const diavola = new Item ('Diavola', '$28', '/images/diavola.jpg')
    const prawn = new Item ('Prawn', '$30', '/images/prawn.jpg')
    const norma = new Item ('Norma', '$27', '/images/norma.jpg')
    const tuna = new Item ('Tuna', '$25', '/images/tuna.jpg')
    const peperoni = new Item ('Peperoni', '$26', '/images/peperoni.jpg')
    const calzone = new Item ('Calzone', '$25', '/images/calzone.jpg')
    const garlic = new Item ('Garlic', '$23', '/images/garlic.jpg')
    const seafood = new Item ('Seafood', '$28', '/images/seafood.jpg')
    const potato = new Item ('Potato', '$26', '/images/potato.jpg')
    const cocaCola = new Item ('Coca-Cola', '$4', '/images/cocaCola.jpg')
    const fanta = new Item ('Fanta', '$4', '/images/fanta.jpg')
    const sprite = new Item ('Sprite', '$4', '/images/sprite.jpg')

    const items = [margherita, marinara, prosciutto, diavola, prawn, norma, tuna, peperoni, calzone, garlic, seafood, potato, cocaCola, fanta, sprite]

    for (const item of items) {

        item.addToOrder()   

    }

    document.getElementById('clearAll').addEventListener('click', e => {
        while (document.getElementById('selectedItems').firstChild){
            document.getElementById('selectedItems').firstChild.remove() 
        }
        prices.splice(0,prices.length)
        console.log(prices)
        document.getElementById('totalPrice').innerText = '$0.00'
    })

})

fetch('hemealdb.com/api/json/v1/1/search.php?s=Arrabiata')
    .then(resp => resp.json())
    .then(json => {
        console.log(json)
    })
