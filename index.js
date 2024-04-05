const url = 'https://boolean-api-server.fly.dev/tzoltie/pokemon'
const pokemonForm = document.querySelector('#poke-form')
const nameInput = document.querySelector('#name-input')
const urlInput = document.querySelector('#image-input')
const cardList = document.querySelector('.cards')
const mainPage = document.querySelector('#home')

function getCards() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            cardList.innerHTML = ''
            json.forEach(pokemon => createCard(pokemon.name, pokemon.image, pokemon.liked));
        })
}


function createCard(name, image, liked) {
    const listItem = document.createElement('li')
    listItem.classList.add('card')
    
    const cardHeader = document.createElement('section')
    cardHeader.classList.add('card-header')
    listItem.append(cardHeader)
    const deleteBtn = document.createElement('input')
    deleteBtn.classList.add('delete-button')
    deleteBtn.type = 'button'
    deleteBtn.value = 'X'
    cardHeader.append(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        removerCard(listItem)})


    const likedBtn = document.createElement('img')
    likedBtn.width = '30'
    likedBtn.classList.add('like-button')
    likedBtn.setAttribute('src', 'assets/svg/like.svg')
    cardHeader.append(likedBtn)
    

    const pokemonName = document.createElement('h2')
    pokemonName.classList.add('card--title')
    pokemonName.innerText = name
    listItem.append(pokemonName)

    const pokemonImage = document.createElement('img')
    pokemonImage.width = '256'
    pokemonImage.classList.add('card--img')
    pokemonImage.setAttribute('src', image)
    listItem.append(pokemonImage)

    const updateBtn = document.createElement('input')
    updateBtn.classList.add('update-button')
    updateBtn.type = 'button'
    updateBtn.value = 'Evolve'
    listItem.append(updateBtn)
    
    updateBtn.addEventListener('click', () => {
        popUpMessage()
    })

    cardList.append(listItem)
}



pokemonForm.addEventListener('submit', (element) => {
    element.preventDefault()

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            image: urlInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then(json => {
            getCards()
            cardList.innerHTML = ''
        })
})


function updateCard() {
    fetch(url, {
        method: 'PUT', 
        body: JSON.stringify({
            name: nameInput.value,
            image: urlInput.value,
            liked: false
        }),
        headers: {
            'Content-type': 'application/json'
        }
        .then((response) => response.json())
        .then(json => {
        getCards()
        cardList.innerHTML = ''
        })
    })
}


getCards()

function removerCard(listItem) {
    listItem.remove()
}


function popUpMessage() {
    const form = document.createElement('form')
    form.setAttribute('id', 'update-form')

    const nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name:'

    const nameInput = document.createElement('input')
    nameInput.setAttribute('id', 'updated-name-input')
    nameInput.type = 'text'
    nameInput.name = 'name'
    nameInput.required
    nameLabel.append(nameInput)
    form.append(nameLabel)

    const urlLabel = document.createElement('label')
    urlLabel.innerText = 'Image URL:'

    const urlInput = document.createElement('input')
    urlInput.setAttribute('id', 'updated-image-input')
    urlInput.type = 'text'
    urlInput.name = 'image'
    urlInput.required
    urlLabel.append(urlInput)
    form.append(urlLabel)

    const submitInput = document.createElement('input')
    submitInput.type = 'submit'
    submitInput.value = 'EVOLVE POKEMON'
    form.append(submitInput)

    submitInput.addEventListener('submit', updateCard())

    mainPage.append(form)
}