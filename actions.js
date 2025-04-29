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

const close_button = document.getElementById('close-bttn');

close_button.addEventListener('click', e => {
    close_popup();
});

// POP UP



document.addEventListener("click", function (e) {
    e.preventDefault();
    const current_clicked = e.target.closest('a')
    if (!current_clicked) return;

    const current_clicked_class = current_clicked.getAttribute('class');
    const current_clicked_id = current_clicked.getAttribute('data-id');

    switch (current_clicked_class) {
        case 'del':
            del_item(current_clicked_id);
            break;
        case 'info':
            info_item(current_clicked_id);
            break;
        case 'edit':
            edit_item(current_clicked_id);
            break;
        case 'add-new':
            add_new();
            break;
        default:
            break;
    }

});

const del_item = (id) => {
    let elementToDelete = document.getElementById(id);
    if (elementToDelete) {
        elementToDelete.remove();
        delete db.users[id];
    }
    if (document.querySelectorAll('.items .item').length == 0) {
        document.querySelectorAll('.items')[0].innerHTML = user_item_template_empty();
    }

    update_counter(get_count(db.users));
}

const info_item = (id) => {
    const user = getUserById(id);
    const popup = document.getElementById('popup-content');
    popup.innerHTML = form_template({ type: 'info', data: user });

    run_callbacks({
        open_popup
    });
}


const edit_item = (id) => {
    const user = getUserById(id);
    const popup = document.getElementById('popup-content');
    popup.innerHTML = form_template({ type: 'edit', data: user });

    run_callbacks({
        open_popup,
    });
}

const add_new = () => {
    const popup = document.getElementById('popup-content');
    popup.innerHTML = form_template({ type: 'add' });
    run_callbacks({
        open_popup,
    });
    update_counter(get_count(db.users));

};


// const form_submit = () => {


document.addEventListener("submit", function (e) {
    e.preventDefault();

    const form_type = document.getElementById('form-type');

    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let address = document.getElementById('address');
    let age = document.getElementById('age');
    let image_url = document.getElementById('image_url');
    let id = document.getElementById('item-id');
    let itemData = {};

    if (form_type.value === "add-new") {
        itemData.id = generate_id(5);
    } else {
        itemData.id = id.value;
    }

    itemData.name = name.value;
    itemData.phone = phone.value;
    itemData.address = address.value;
    itemData.age = age.value;
    itemData.image_url = image_url.value;



    switch (form_type.value) {
        case 'edit':
            update_item(itemData)
            break;
        case 'add-new':
            create_item(itemData)
            break;
        default:
            break;
    }

    run_callbacks({ close_popup });

});


const create_item = data => {
    db.users = Object.assign({ [data.id]: data }, db.users)
    render_users(getUsers());
};

const update_item = data => {

    db.users[data.id].name = data.name;
    db.users[data.id].address = data.address;
    db.users[data.id].age = data.age;
    db.users[data.id].image_url = data.image_url;
    db.users[data.id].phone = data.phone;


    run_callbacks({ close_popup })

    render_users(getUsers());

};

// }

// add_new();


// const item_actions = () => {

//     const elements = document.querySelectorAll('.items .item a');

//     for (let index = 0; index < elements.length; index++) {
//         const element = elements[index];

//         element.addEventListener('click', e => {
//             e.preventDefault();

//             if (e.target.closest('a') == null) return false;

//             const parent_item = e.target.closest('.item');
//             const name = parent_item.getAttribute('data-name');
//             const phone = parent_item.getAttribute('data-phone');
//             const age = parent_item.getAttribute('data-age');
//             const address = parent_item.getAttribute('data-address');
//             const image = parent_item.getAttribute('data-image');
//             const clicked_attribute_id = e.target.closest('a').getAttribute('data-id');
//             const current_clicked_type = e.target.closest('a').getAttribute('class');
//             const popup = document.getElementById('popup-content');

//             if (!clicked_attribute_id) return;

//             popup.innerHTML = form_template({
//                 type: current_clicked_type, data: {
//                     p_id: clicked_attribute_id,
//                     p_name: name,
//                     p_phone: phone,
//                     p_age: age,
//                     p_address: address,
//                     p_image: image,
//                 }
//             });

//             run_callbacks({
//                 dataFromForm,
//                 open_popup
//             });

//         });
//     }

// }


// const edit_item = () => {

//     const elements = document.querySelectorAll('.items .item a.edit');


// }





// const dataFromForm = () => {

//     let itemData = {};
//     document.addEventListener('submit', (e) => {
//         e.preventDefault();

//         let name = document.getElementById('name');
//         let phone = document.getElementById('phone');
//         let address = document.getElementById('address');
//         let age = document.getElementById('age');
//         let image_url = document.getElementById('image_url');
//         itemData.id = generate_id(5);
//         itemData.name = name.value;
//         itemData.phone = phone.value;
//         itemData.address = address.value;
//         itemData.age = age.value;
//         itemData.image_url = image_url.value;
//         create_item(itemData);
//         run_callbacks({ item_actions, deletef, close_popup })
//     });

// }





// const update_item = (data) => {



// }




