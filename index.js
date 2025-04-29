'use_strict';

let db = {
    users:
    {
        [generate_id(5)]: {
            name: 'John Doe 55',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: './images/asf.webp',
        },
        [generate_id(5)]: {
            name: 'John Doe',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: './images/asf.webp',
        },
        [generate_id(5)]: {
            name: 'John Doe',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: './images/asf.webp',
        },
    }
};



const getUsers = () => {

    let usersNew = {}

    if (Object.entries(db.users).length > 0) {
        for (const [key, value] of Object.entries(db.users)) {
            for (const [k, v] of Object.entries(value)) {
                usersNew[key] = {
                    id: key,
                    name: value.name,
                    phone: value.phone,
                    address: value.address,
                    age: value.age,
                    image_url: value.image_url
                }
            }
        }
    }

    return usersNew;
};

const getUserById = id => {
    const user = db.users[id];

    if (!user) {
        return null;
    }
    return {
        id: id,
        name: user.name,
        phone: user.phone,
        address: user.address,
        age: user.age,
        image_url: user.image_url,
    };
};

const user_item_template = user => {
    return `
        <div class="item flex f-j-sb f-a-c" id="${user.id}"
            data-entryid=""
            data-name="${user.name}" 
            data-phone="${user.phone}" 
            data-age="${user.age}" 
            data-address="${user.address}" 
            data-image="${user.image_url}" >

            <div class="left flex f-a-c">
                <div class="image">
                    <img src="${user.image_url}" alt="${user.name}">
                </div>
                <div class="name">
                    ${user.name}
                </div>
            </div>
            <div class="right flex">
                <div class="buttons f-a-c flex f-j-sb">
                    <a href="#" class="edit" data-id="${user.id}"> <img src="./images/pen-to-square-solid.svg" alt=""> </a>
                    <a href="#" class="del" data-id="${user.id}"> <img src="./images/trash-solid.svg" alt=""> </a>
                    <a href="#" class="info" data-id="${user.id}"> <img src="./images/circle-info-solid.svg" alt=""> </a>
                </div>
            </div>

        </div>
    `;
};

const user_item_template_empty = user => {
    return `
        <div class="empty flex f-j-sb">
           No entries
        </div>
    `;
};



const form_template = (data) => {

    let formTemplate = '';
    if (data.type === 'add') {
        formTemplate = `
        <form action="" id="add-new-form">
        <div class="fields flex f-wrap f-j-sb">
        <input type="hidden" value="add-new" name="form-type" id="form-type">
        <input type="hidden" value="" name="item-id">
        <input type="text" name="name" id="name" value="" placeholder="Enter name">
        <input type="phone" name="phone" id="phone" value="" placeholder="Enter phone">
        <input type="text" name="address" id="address" value="" placeholder="Enter address">
        <input type="number" name="age" id="age" value="" placeholder="Enter age">
        <input type="url" name="image_url" id="image_url" placeholder="Image Url">
        <input type="submit" value="Save">
        </div>
        </form>
    `;
    }
    else if (data.type === 'edit') {
        formTemplate = `
        <form action="" id="edit-form">
        <div class="fields flex f-wrap f-j-sb">
        <input type="hidden" value="edit" name="form-type" id="form-type">
        <input type="hidden" value="${data.data.id}" name="item-id" id="item-id">
        <input type="text" name="name" id="name" value="${data.data.name ? data.data.name : ""}" placeholder="Enter name">
        <input type="phone" name="phone" id="phone" value="${data.data.phone ? data.data.phone : ""}" placeholder="Enter phone">
        <input type="text" name="address" id="address" value="${data.data.address ? data.data.address : ""}" placeholder="Enter address">
        <input type="number" name="age" id="age" value="${data.data.age ? data.data.age : ""}" placeholder="Enter age">
        <input type="url" name="image_url" id="image_url" value="${data.data.image_url ? data.data.image_url : ""}" placeholder="Image Url">
        <input type="submit" value="Save">
        </div>
        </form>
    `;

    }
    else if (data.type === 'info') {

        formTemplate = `
        <div class="info-content">
            <div> ${data.data.name} </div>
            <div> ${data.data.phone} </div>
            <div> ${data.data.address} </div>
            <div> ${data.data.age} </div>
            <div> <img src="${data.data.image_url}" alt="${data.data.name}"> </div>
        </div>
    `;
    }

    return formTemplate;
}

const render_users = (users, callback) => {
    const container = document.getElementById('user-list');
    container.innerHTML = ''; // Clear previous content

    if (Object.entries(users).length > 0) {
        for (const [k, v] of Object.entries(users)) {
            const userHTML = user_item_template(v);
            container.innerHTML += userHTML;
        }
    } else {
        const userHTML = user_item_template_empty();
        container.innerHTML += userHTML;
    }

    // run_callbacks({
    //     item_actions,
    //     deletef
    // })

    update_counter(get_count(users));
};

function run_app() {
    render_users(getUsers());
}

run_app();