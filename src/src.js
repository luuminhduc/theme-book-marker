const nameEl = document.getElementById('name');
const authorEl = document.getElementById('author');
const descriptionEl = document.getElementById('description');
const form = document.getElementById('form');
const inputs = document.querySelectorAll('input');
const firstEl = document.querySelector('.first');
const rowEl = document.querySelector('#output .row');

class Book{
    constructor(name, author, description) {
        this.name = name,
        this.author = author,
        this.description = description
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(check()) {
        const name = nameEl.value;
        const author = authorEl.value;
        const description = descriptionEl.value;
        const book = new Book(name, author, description);
        clearInput();
        
        showMessage('success', 'Item is added');

        const img = getImg(name).then(data => {
            renderCard(book, data);
        });

        
    }
})

const showMessage = (className, message) => {
    const alertEl = document.createElement('div');
    alertEl.className = `col-md-6 col-alert`;
    alertEl.innerHTML = `<div class="alert alert-${className}">
                            ${message}
                        </div>`
    firstEl.appendChild(alertEl);
    alertEl.classList.add('active');
    setTimeout(() => {
        alertEl.classList.remove('active');
        if(!alertEl.classList.contains('active')) {
            alertEl.remove();
        }
    }, 2000)
}

const clearInput = () => {
    nameEl.value = '';
    authorEl.value = '';
}

const renderCard = (book, img) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'col-md-4 mt-auto';
    cardEl.innerHTML = ` 
                         <div class="card">
                         <img class="card-image-top" src="${img}">
                           <div class="card-body">
                              <h5 class="card-title">${book.author}</h5>
                              <p class="badge badge-secondary">${book.name}</p>
                              <p class="card-text">${book.description}</p>
                              <button class="btn btn-danger delete">Delete</button>
                           </div>
                         </div>
                       `; 
    rowEl.appendChild(cardEl);                   
}

window.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.parentElement.remove();
        showMessage('success', 'Item is deleted');
    }
})

const getImg = (term) => {
    return fetch(`https://pixabay.com/api/?key=15977895-930a4cf88aa558815d6bf03e8&q=${term}&image_type=image&per_page=10&pretty=true`)
    .then(data => data.json())
    .then(data => {
        const imgArr = data.hits;
        return imgArr[Math.floor(Math.random() * imgArr.length)].webformatURL;
    })
    .catch(err => console.log(err))

}
const check = () => {
    if([...inputs].every(el => el.value !== '')) {
        return true;
    }else{
        inputs.forEach(input => {
            if(input.value === '') {
                console.log("OK");
                if(!input.parentElement.classList.contains('warning')) {
                    console.log("ngu");

                    showWarning(input, 'This field can not be blank');
                }
            }
        })
        return false;
    }
}

const showWarning = (input, msg) => {
    const smallEl = document.createElement('small');
    smallEl.innerText = msg;
    input.parentElement.appendChild(smallEl);
    input.parentElement.classList.add('warning');
}


inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        if(input.value !== '') {
            if(input.parentElement.classList.contains('warning')) {
                input.parentElement.classList.remove('warning');
                input.parentElement.querySelector('small').remove();
            }
        }
    })
})

