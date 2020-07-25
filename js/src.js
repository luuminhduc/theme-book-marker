'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nameEl = document.getElementById('name');
var authorEl = document.getElementById('author');
var descriptionEl = document.getElementById('description');
var form = document.getElementById('form');
var inputs = document.querySelectorAll('input');
var firstEl = document.querySelector('.first');
var rowEl = document.querySelector('#output .row');

var Book = function Book(name, author, description) {
    _classCallCheck(this, Book);

    this.name = name, this.author = author, this.description = description;
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (check()) {
        var name = nameEl.value;
        var author = authorEl.value;
        var description = descriptionEl.value;
        var book = new Book(name, author, description);
        clearInput();

        showMessage('success', 'Item is added');

        var img = getImg(name).then(function (data) {
            renderCard(book, data);
        });
    }
});

var showMessage = function showMessage(className, message) {
    var alertEl = document.createElement('div');
    alertEl.className = 'col-md-6 col-alert';
    alertEl.innerHTML = '<div class="alert alert-' + className + '">\n                            ' + message + '\n                        </div>';
    firstEl.appendChild(alertEl);
    alertEl.classList.add('active');
    setTimeout(function () {
        alertEl.classList.remove('active');
        if (!alertEl.classList.contains('active')) {
            alertEl.remove();
        }
    }, 2000);
};

var clearInput = function clearInput() {
    nameEl.value = '';
    authorEl.value = '';
};

var renderCard = function renderCard(book, img) {
    var cardEl = document.createElement('div');
    cardEl.className = 'col-md-4 mt-auto';
    cardEl.innerHTML = ' \n                         <div class="card">\n                         <img class="card-image-top" src="' + img + '">\n                           <div class="card-body">\n                              <h5 class="card-title">' + book.author + '</h5>\n                              <p class="badge badge-secondary">' + book.name + '</p>\n                              <p class="card-text">' + book.description + '</p>\n                              <button class="btn btn-danger delete">Delete</button>\n                           </div>\n                         </div>\n                       ';
    rowEl.appendChild(cardEl);
};

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.parentElement.remove();
        showMessage('success', 'Item is deleted');
    }
});

var getImg = function getImg(term) {
    return fetch('https://pixabay.com/api/?key=15977895-930a4cf88aa558815d6bf03e8&q=' + term + '&image_type=image&per_page=10&pretty=true').then(function (data) {
        return data.json();
    }).then(function (data) {
        var imgArr = data.hits;
        return imgArr[Math.floor(Math.random() * imgArr.length)].webformatURL;
    }).catch(function (err) {
        return console.log(err);
    });
};
var check = function check() {
    if ([].concat(_toConsumableArray(inputs)).every(function (el) {
        return el.value !== '';
    })) {
        return true;
    } else {
        inputs.forEach(function (input) {
            if (input.value === '') {
                console.log("OK");
                if (!input.parentElement.classList.contains('warning')) {
                    console.log("ngu");

                    showWarning(input, 'This field can not be blank');
                }
            }
        });
        return false;
    }
};

var showWarning = function showWarning(input, msg) {
    var smallEl = document.createElement('small');
    smallEl.innerText = msg;
    input.parentElement.appendChild(smallEl);
    input.parentElement.classList.add('warning');
};

inputs.forEach(function (input) {
    input.addEventListener('input', function (e) {
        if (input.value !== '') {
            if (input.parentElement.classList.contains('warning')) {
                input.parentElement.classList.remove('warning');
                input.parentElement.querySelector('small').remove();
            }
        }
    });
});