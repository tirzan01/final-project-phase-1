
    const prices = []
    
    function totalPriceCalculator(arrayOfPrices) {
        const convertPriceToIntigers = arrayOfPrices.map(e => parseInt(e.replace('$', '')))
        return `$${convertPriceToIntigers.reduce((curr, acc) => curr + acc, 0)}.00`
        
    }

    class Item {
        constructor(name, price, img) {
            this.name = name
            this.img = img
            this.price = price
        }
    }

document.addEventListener('DOMContentLoaded', () => {
    
    let profileName, phoneNumber, adress

    document.getElementById('profile').addEventListener('click', () =>{
        const userBox = document.getElementById('userInfoBox')
        if(userBox.style.display === 'none'){
            userBox.style.display = 'block'
        }else{
            userBox.style.display = 'none'
        }
    })

    document.getElementById('submitUserInfo').addEventListener('submit', e => {
        e.preventDefault()
        profileName = document.getElementById('username').value
        phoneNumber = document.getElementById('phoneNumber').value
        adress = document.getElementById('adress').value
        document.getElementById('submitUserInfo').reset()
        document.getElementById('userInfoBox').style.display = 'none'
    })
    
    const stars = document.querySelectorAll('.emptyStar')
    
    for (let i = 0; i < stars.length; i++) {
        for (let x  = i; x < stars.length; x++) {
            stars[i].addEventListener('click', () => {
                for (let x = 0; x < stars.length; x++) {
                    if(x <= i){
                        stars[x].innerHTML = '<img src = "/images/fullStar.png"></img>'            
                    }else{
                        stars[x].innerHTML = '<img src = "/images/emptyStar.png"></img>'            
                    }                  
                }
            })
        }
    }

    // review example: Very nice food, I am definitely coming back!!!

    document.getElementById('submitReview').addEventListener('submit', e => {
        e.preventDefault()
        if(!profileName) {
            alert('Please sign in before continuing')
            document.getElementById('userInfoBox').style.display = 'block'
            return
        }
        const reviewBox = document.getElementById('reviewBox')
        while(reviewBox.firstChild){
            reviewBox.firstChild.remove()
        }
        reviewBox.innerHTML +=`
        <h3 id = 'reviewerName'>${profileName}</h3>
        <span class = 'postedStars'>${document.getElementById('star1').innerHTML}</span><span class = 'postedStars'>${document.getElementById('star2').innerHTML}</span><span class = 'postedStars'>${document.getElementById('star3').innerHTML}</span><span class = 'postedStars'>${document.getElementById('star4').innerHTML}</span><span class = 'postedStars'>${document.getElementById('star5').innerHTML}</span>
        
        <p id = 'postedReviewText'>${document.getElementById('reviewText').value}</p>
        `
        document.getElementById('submitReview').reset()
        for (let i = 0; i < stars.length; i++) {
            stars[i].innerHTML = '<img src="/images/emptyStar.png">'
        }
    })

    document.getElementById('deleteReview').addEventListener('click', () => {
        while(reviewBox.firstChild){
            reviewBox.firstChild.remove()
        }
        document.getElementById('reviewBox').innerHTML = '<p>No reviews yet</p>'
    })

    const items = [
        new Item ('Margherita', '$25', '/images/margherita.jpg'), 
        new Item ('Marinara', '$22', '/images/marinara.jpg'),  
        new Item ('Prosciutto', '$28', '/images/prosciutto.jpg'),
        new Item ('Diavola', '$28', '/images/diavola.jpg'),
        new Item ('Prawn', '$30', '/images/prawn.jpg'),
        new Item ('Norma', '$27', '/images/norma.jpg'),
        new Item ('Tuna', '$25', '/images/tuna.jpg'),
        new Item ('Peperoni', '$26', '/images/peperoni.jpg'),
        new Item ('Calzone', '$25', '/images/calzone.jpg'),
        new Item ('Garlic', '$23', '/images/garlic.jpg'),
        new Item ('Seafood', '$28', '/images/seafood.jpg'),
        new Item ('Potato', '$26', '/images/potato.jpg'),
        new Item ('Coca-Cola', '$4', '/images/cocaCola.jpg'),
        new Item ('Fanta', '$4', '/images/fanta.jpg'),
        new Item ('Sprite', '$4', '/images/sprite.jpg')
    ]
    
    fetchPasta(52839, linguine, 'Linguine', '$27')

    fetchPasta(52844, lasagne, 'Lasagne', '$25')

    fetchPasta(52823, risotto, 'Risotto', '$27')

    for (const item of items) {

        document.getElementById(item.name).addEventListener('click', () => addToOrder(item))

    }

    document.getElementById('clearAll').addEventListener('click', e => {
        while (document.getElementById('selectedItems').firstChild){
            document.getElementById('selectedItems').firstChild.remove() 
        }
        prices.splice(0,prices.length)
        document.getElementById('totalPrice').innerText = '$0.00'
    })

    document.getElementById('placeOrder').addEventListener('click', () => {
        alert('Your order has been processed, please expect a phone call to verify your order.\n Thank you for coosing Bella Puglia!')
        while (document.getElementById('selectedItems').firstChild){
            document.getElementById('selectedItems').firstChild.remove() 
        }
        document.getElementById('totalPrice').innerText = '$0.00'
    })
    
})

function addToOrder(item) {
    let orderedItem = document.createElement('p')
    let button = document.createElement('button')
    button.classList.add('removeItem')
    button.innerText = 'x'
    button.type = 'button'
    button.classList.add('btn-danger')
    orderedItem.innerHTML +=
    `<span class = 'addedItemName'>${item.name}</span><span class = 'addedItemPrice' width = '10px'>${item.price}</span>`
    prices.push(item.price)
    orderedItem.appendChild(button)
    document.getElementById('selectedItems').appendChild(orderedItem)
    button.addEventListener('click', e => {
        orderedItem.remove()
        for (let i = 0; i < prices.length; i++) {
            if(item.price === prices[i]){
                prices.splice(i, 1)
                break
            }
        }
        document.getElementById('totalPrice').innerText = totalPriceCalculator(prices)
    })
    document.getElementById('totalPrice').innerText = totalPriceCalculator(prices)
}

// Special thanks to TheMealDB for their fantastic API link to their doc: https://www.themealdb.com/api.php?ref=apilist.fun

function fetchPasta(id, description, pastaName, price) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(resp => resp.json())
        .then(json => {
            const info = json.meals[0]
            const itemContainer = document.createElement('div')
            itemContainer.classList.add('pasta')
            itemContainer.innerHTML = description(info)
            document.getElementById('pasta').appendChild(itemContainer)
            const itemClass = new Item (`${pastaName}`, `${price}`, `${info.strMealThumb}`)
            document.getElementById(`${info.strMeal}`).addEventListener('click', () => addToOrder(itemClass))
        })
}

const lasagne = info => `
<img
    src="${info.strMealThumb}"
    alt="${info.strMeal}"
    width="300px"
    height="200px"
    class="pizzaImg"
/>
<h2 class="pizzaName" id="${info.strMeal}">${info.strMeal}.......$25</h2>
<p class="pizzaText">
    ${info.strIngredient11} and ${info.strIngredient8} with ${info.strIngredient7} and ${info.strIngredient13}, topped with ${info.strIngredient14}
</p>
`


const linguine = info => `
<img
    src="${info.strMealThumb}"
    alt="${info.strMeal}"
    width="300px"
    height="200px"
    class="pizzaImg"
/>
<h2 class="pizzaName" id="${info.strMeal}">P${info.strMeal.replace('Chilli p', '')}.......$27</h2>
<p class="pizzaText">
    ${info.strIngredient1} with ${info.strIngredient6}, ${info.strIngredient7} and ${info.strIngredient11}, topped with ${info.strIngredient5} and ${info.strIngredient8}
</p>
`

const risotto = info => `
<img
    src="${info.strMealThumb}"
    alt="${info.strMeal}"
    width="300px"
    height="200px"
    class="pizzaImg"
/>
<h2 class="pizzaName" id="${info.strMeal}">${info.strMeal.replace('Salmon Prawn ', '')}.......$27</h2>
<p class="pizzaText">
    ${info.strIngredient3} with ${info.strIngredient7}, ${info.strIngredient8} and ${info.strIngredient9}, topped with ${info.strIngredien10} and ${info.strIngredient11}
</p>
`