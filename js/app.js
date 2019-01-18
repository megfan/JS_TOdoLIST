//getting elements________

const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.getElementById('clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];

let itemData = JSON.parse(localStorage.getItem('list')) || [];

if(itemData.length > 0){
    itemData.forEach(function(singleItem){
        console.log(singleItem);
        itemList.insertAdjacentHTML("beforeend",`
            <div class="item my-3">
                <h5 class="item-name">${singleItem}</h5>
                <div class="item-icons">
                    <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
                    <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
                    <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
                </div>
            </div>
        `);
        handleItem(singleItem);
    });
}

//form submision________

itemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const textValue = itemInput.value;
    textValue.lenght === ""
        ? showFeedback('please enter valid value', 'danger')
        : addItem(textValue);
          itemInput.value = '';
          itemData.push(textValue);
          handleItem(textValue);
          localStorage.setItem('list', JSON.stringify(itemData));
});

//show feedback message
function showFeedback(text, action){
    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(() => {
        feedback.classList.remove("showItem", `alert-${action}`);
    }, 3000);
}
//adding item to list
function addItem(value){
    const div = document.createElement('div');
    div.classList.add('item', 'm-3');
    div.innerHTML = `
        <h5 class="item-name">${value}</h5>
        <div class="item-icons">
            <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
            <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
    `;
    itemList.appendChild(div);
}

function handleItem(textValue) {
    const items = itemList.querySelectorAll('.item');
    items.forEach((item) => {
        if(item.querySelector('.item-name').textContent === textValue){
            item
                .querySelector('.complete-item')
                .addEventListener('click', function(){
                    item.querySelector('.item-name').classList.toggle('completed');
                    this.classList.toggle('visibility');
                    showFeedback('great job! You did it!', 'success');
                });
            item
                .querySelector('.edit-item')
                .addEventListener('click', function(){
                    itemInput.value = textValue;
                    itemList.removeChild(item);
                    itemData = itemData.filter(function(item){
                        return item !== textValue;
                    });
                    localStorage.setItem('list', JSON.stringify(itemData));
                    showFeedback('You have change Your mind?', 'success');
                });
                item
                .querySelector('.delete-item')
                .addEventListener('click', function(){
                    itemList.removeChild(item);
                    itemData = itemData.filter(function(item){
                        return item !== textValue;
                    });
                    localStorage.setItem('list', JSON.stringify(itemData));
                    showFeedback('Yea! Finished it!', 'success');
                });
    }})
}; 
clearBtn.addEventListener('click', () => {
    itemData = [];
    localStorage.removeItem('list');
    const items = itemList.querySelectorAll('.item');
    if(items.length > 0){
        items.forEach((item) => {
            itemList.removeChild(item);
        });
    }
})