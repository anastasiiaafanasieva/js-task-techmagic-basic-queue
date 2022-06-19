'use strict';

const input = document.querySelector('.queue__input');
const addButton = document.querySelector('.queue__button-add');
const removeButton = document.querySelector('.queue__button-remove');
const queueBlocks = document.querySelector('.queue__blocks');
const limitValue = 28;
let inputValue = '';
const key = 'item';

input.addEventListener('change', (event) => {
  inputValue = event.target.value;
})

addButton.addEventListener('click', () => {
  let array = getArray();

  if (inputValue) {
    if (array.length < limitValue) {
      addToLocalStorage(array);
      createBlock(inputValue);
    } else {
      window.alert('Oops, limit exceeded');
    }
  } else {
    window.alert('Please, enter value')
  }

  inputValue = '';
  input.value = '';
});

removeButton.addEventListener('click', () => {
  let array = getArray();
  if (array.length > 0) {
    removeFromLocalStorage(array);
    const allBlocks = document.querySelectorAll('.queue__blocks-block');
    allBlocks[allBlocks.length - 1].remove();
  } else {
    window.alert('Oops, nothing to remove! Please, enter value');
  }
});

function addToLocalStorage(array) {
  array.push(inputValue);
  window.localStorage.setItem(key, JSON.stringify(array));
}

function removeFromLocalStorage(array) {
  array.shift();
  window.localStorage.setItem(key, JSON.stringify(array));
}

function getArray() {
  let jsonObj = window.localStorage.getItem(key);
  return !jsonObj ? [] : JSON.parse(jsonObj);
}

function createBlock(item) {
  queueBlocks.insertAdjacentHTML('afterbegin', `
  <div class="queue__blocks-block">
    <p class="queue__blocks-title">${item}</p>
  </div>
`);
}

function render() {
  let inputs = getArray();

  inputs.forEach(item => {
    createBlock(item);
  });
}

render();
