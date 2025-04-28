'use_strict';


const add_item = data => {

    // db.users.push(data);

    console.log(db.users);


    db.users[253].push(db.users);
    render_users(getUsers());
};


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
// POP UP



const actions = () => {
    const close_button = document.getElementById('close-bttn');
    const add_new = document.getElementById('add-new');
    const info = document.getElementById('info');

    close_button.addEventListener('click', e => {
        close_popup();
    });

    add_new.addEventListener('click', e => {
        e.preventDefault();
        const popup = document.getElementById('popup-content');
        popup.innerHTML = form_template({ type: 'add' });
        dataFromForm();
        open_popup();
    });


    // info.addEventListener('click', e => {
    //     e.preventDefault();


    //     const popup = document.getElementById('popup-content');
    //     popup.innerHTML = form_template({
    //         type: 'edit', data: {
    //             p_name: name,
    //             p_phone: phone,
    //             p_age: age,
    //             p_address: address,
    //             p_image: image,
    //         }
    //     });

    //     open_popup();
    // });
};

actions();


const item_acttions = () => {

    const elements = document.querySelectorAll('.items .item');


    document.querySelector('img').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the event from bubbling to the parent <a>
    });


    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];

        element.addEventListener('click', e => {
            e.preventDefault();

            console.log();

            if (e.target.closest('a') == null) return false;

            const name = element.getAttribute('data-name');
            const phone = element.getAttribute('data-phone');
            const age = element.getAttribute('data-age');
            const address = element.getAttribute('data-address');
            const image = element.getAttribute('data-image');
            const clicked_attribute_id = e.target.closest('a').getAttribute('id');
            const parent_attribute_id = element.getAttribute('id');
            const popup = document.getElementById('popup-content');

            let popup_form_type = '';

            if (clicked_attribute_id === 'info-' + parent_attribute_id) {
                popup_form_type = 'info'
            } else if (clicked_attribute_id === 'edit-' + parent_attribute_id) {
                popup_form_type = 'edit';
            } else {
                return false;
            }

            popup.innerHTML = form_template({
                type: popup_form_type, data: {
                    p_name: name,
                    p_phone: phone,
                    p_age: age,
                    p_address: address,
                    p_image: image,
                }
            });
            open_popup();
        });
    }

}


const deletef = () => {

    const del = document.querySelectorAll('.items .item');
    if (del.length === 0) return;

    for (let index = 0; index < del.length; index++) {
        const element = del[index];
        element.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.closest('a') == null) return false;
            let aTag = e.target.closest('a');
            if (aTag.getAttribute('class') === 'del') {
                delete db.users[aTag.id.replace('del-', '')];
                document.getElementById(aTag.id.replace('del-', '')).remove();
                if (document.querySelectorAll('.items .item').length == 0) {
                    document.querySelectorAll('.items')[0].innerHTML = user_item_template_empty();
                }
            }
        });
    }

}




const dataFromForm = () => {

    const form = document.getElementById('add-new-form');
    let itemData = {};

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let name = document.getElementById('name');
        let phone = document.getElementById('phone');
        let address = document.getElementById('address');
        let age = document.getElementById('age');
        let image_url = document.getElementById('image_url');
        itemData.id = "asf";
        itemData.name = name.value;
        itemData.phone = phone.value;
        itemData.address = address.value;
        itemData.age = age.value;
        itemData.image_url = image_url.value;


        add_item(itemData);
    });



}

