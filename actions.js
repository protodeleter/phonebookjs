'use_strict';



// POP UP
const close_popup = () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
};

const open_popup = () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
};
document.getElementById('popup').addEventListener('click', (e) => {
    close_popup();
})

document.querySelectorAll('.popup .box')[0].addEventListener('click', (e) => {
    e.stopPropagation();
})

const closeButton = document.getElementById('close-bttn');

closeButton.addEventListener('click', e => {
    close_popup();
});

// POP UP

document.getElementById('search').addEventListener("keyup", function (e) {
    let searchTerm = e.target.value;
    let searchResuls = searchFunction(searchTerm);
    renderSearchResults(searchResuls);
});


const renderSearchResults = (users) => {

    if (users.length === 0) return;

    const container = document.getElementById('user-list');
    container.innerHTML = ''; // Clear previous content

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        const userHTML = userItemTemplate(getUserById(element));
        container.innerHTML += userHTML;
    }

}

const searchFunction = (par) => {


    let foundKeys = [];
    for (const key in db.users) {
        if (db.users[key].name.includes(par)) {
            foundKeys.push(key);
        }
    }

    return foundKeys;
}



document.addEventListener("click", function (e) {
    e.preventDefault();
    const currentClicked = e.target.closest('a')
    if (!currentClicked) return;

    const currentClickedClass = currentClicked.getAttribute('class');
    const currentClickedId = currentClicked.getAttribute('data-id');

    switch (currentClickedClass) {
        case 'del':
            deleteItem(currentClickedId);
            break;
        case 'info':
            infoItem(currentClickedId);
            break;
        case 'edit':
            editItem(currentClickedId);
            break;
        case 'add-new':
            addNew();
            break;
        case 'del-all':
            deleteAll();
            break;

        default:
            break;
    }

});

const deleteAll = () => {
    db.users = {};
    updateCounter(getCount(db.users));
    renderUsers(getUsers());
}

const deleteItem = (id) => {
    let elementToDelete = document.getElementById(id);
    if (elementToDelete) {
        elementToDelete.remove();
        delete db.users[id];
    }
    if (document.querySelectorAll('.items .item').length == 0) {
        document.querySelectorAll('.items')[0].innerHTML = userItemTemplateEmpty();
    }
    updateCounter(getCount(db.users));
}

const infoItem = (id) => {
    const user = getUserById(id);
    const popup = document.getElementById('popup-content');
    popup.innerHTML = formTemplate({ type: 'info', data: user });

    runCallbacks({
        open_popup
    });
}


const editItem = (id) => {
    const user = getUserById(id);
    const popup = document.getElementById('popup-content');
    popup.innerHTML = formTemplate({ type: 'edit', data: user });

    runCallbacks({
        open_popup,
    });
}

const addNew = () => {
    const popup = document.getElementById('popup-content');
    popup.innerHTML = formTemplate({ type: 'add' });
    runCallbacks({
        open_popup,
    });
    updateCounter(getCount(db.users));

};


// const form_submit = () => {


document.addEventListener("submit", function (e) {
    e.preventDefault();

    const formType = document.getElementById('form-type');

    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let address = document.getElementById('address');
    let age = document.getElementById('age');
    let image_url = document.getElementById('image_url');
    let id = document.getElementById('item-id');
    let itemData = {};

    if (!validation({ name, phone, address, age, image_url })) {
        return false;
    }

    if (formType.value === "add-new") {
        itemData.id = generateId(5);
    } else {
        itemData.id = id.value;
    }

    itemData.name = name.value;
    itemData.phone = phone.value;
    itemData.address = address.value;
    itemData.age = age.value;
    itemData.image_url = image_url.value;



    switch (formType.value) {
        case 'edit':
            updateItem(itemData)
            break;
        case 'add-new':
            createItem(itemData)
            break;
        default:
            break;
    }

    runCallbacks({ close_popup });

});


const createItem = data => {
    db.users = Object.assign({ [data.id]: data }, db.users)
    renderUsers(getUsers());
};

const updateItem = data => {


    db.users[data.id].name = data.name;
    db.users[data.id].address = data.address;
    db.users[data.id].age = data.age;
    db.users[data.id].image_url = data.image_url;
    db.users[data.id].phone = data.phone;

    renderUsers(getUsers());
    runCallbacks({ close_popup })

};





