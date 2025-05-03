'use_strict';


/**
 * Data base object
 */
let db = {
    users:
    {
        [generateId(5)]: {
            name: 'John Smith',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1746027604~exp=1746031204~hmac=807c0a00faae85c442b77f20d928618cb45235517b772c3ee5d0b4a8f1406958&w=740',
        },
        [generateId(5)]: {
            name: 'Patricia Keys',
            phone: '214124124',
            address: '123 Main St',
            age: 25,
            image_url: 'https://img.freepik.com/premium-photo/memoji-beautiful-girl-woman-white-background-emoji_826801-6872.jpg?w=740',
        },
        [generateId(5)]: {
            name: 'Georgina Sims',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        [generateId(5)]: {
            name: 'Lorenzo Goodwin',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1746027604~exp=1746031204~hmac=807c0a00faae85c442b77f20d928618cb45235517b772c3ee5d0b4a8f1406958&w=740',
        },
        [generateId(5)]: {
            name: 'Pavel Nasonov',
            phone: '235235',
            address: '123 Main St',
            age: 25,
            image_url: 'https://scontent.ftlv18-1.fna.fbcdn.net/v/t39.30808-6/493026291_656761140555428_2947196945405164635_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=upcKnsk7A9MQ7kNvwG9wimJ&_nc_oc=AdlxjGPWHBSHt4a-Rhn2AMPKeSkQawk0n1ccckfUBNtzCkO__T8QvfcaZN3vGrleTyY&_nc_zt=23&_nc_ht=scontent.ftlv18-1.fna&_nc_gid=n0Ihz_W7SJwJ7M7MwZn6_g&oh=00_AfHoiPhNYfKzcxkFX8F1VI3RR_daJkHihYPKw5F1iGCEyw&oe=68181351',
        },
    }
};


/**
 * getUsers get entries of the database object and map 
 * @returns object
 */
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

/**
 * get single user by id from db object
 * @param id 
 * @returns object
 */
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
/**
 * HTML template of the sinle item of the phone book
 * @param user 
 * @returns string
 */
const userItemTemplate = user => {
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
                    <a href="#" class="edit" data-id="${user.id}"> <img src="./images/pen-to-square-solid.svg" alt="" class="black">  <img src="./images/pen-to-square-solid-white.svg" alt="" class="white"> </a>
                    <a href="#" class="del" data-id="${user.id}"> <img src="./images/trash-solid.svg" alt="" class="black">   <img src="./images/trash-solid-white.svg" alt="" class="white"> </a>
                    <a href="#" class="info" data-id="${user.id}"> <img src="./images/circle-info-solid.svg" alt="" class="black"> <img src="./images/circle-info-solid-white.svg" alt="" class="white"> </a>
                </div>
            </div>

        </div>
    `;
};

/**
 * HTML template if no items present in phone book
 * @param user 
 * @returns string
 */
const userItemTemplateEmpty = user => {
    return `
        <div class="empty flex f-j-sb">
           No entries
        </div>
    `;
};


/**
 * return html template based on condition. condition parameters are info||add||edit
 * @param data 
 * @returns string 
 */
const popupTemplate = (data) => {

    let formTemplate = '';

    let formId = data.type === "add" ? "add-new" : "edit";

    if (data.type === 'info') {

        formTemplate = `
            <div class="info-content">
                <div class="info-item"> ${data.data.name} </div>
                <div class="info-item"> ${data.data.phone} </div>
                <div class="info-item"> ${data.data.address} </div>
                <div class="info-item"> ${data.data.age} </div>
                <div class="info-item"> <img src="${data.data.image_url}" alt="${data.data.name}"> </div>
            </div>
        `;
    } else {
        formTemplate = `
        <form action="" id="${formId}">
            <div class="fields flex f-wrap f-j-sb">
                <input type="hidden" value="${formId}" name="form-type" id="form-type">
                <input type="hidden" value="${data.data && data.data.id}" name="item-id" id="item-id">
                <div class="field name">
                    <label for="name" class="flex f-a-c">
                        <span>Name*:</span>
                        <input type="text" name="name" id="name" value="${(data.data && data.data.name) ? data.data.name : ''}" placeholder="Enter name">
                    </label >
                    <span class="error"></span>
                </div >

                <div class="field phone">
                    <label for="phone" class="flex f-a-c">
                        <span>Phone*:</span>
                        <input type="phone" name="phone" id="phone" value="${data.data && data.data.phone ? data.data.phone : ''}" placeholder="Enter phone">
                    </label>
                    <span class="error"></span>
                </div>

                <div class="field address">
                    <label for="Address" class="flex f-a-c">
                        <span>Address*:</span>
                        <input type="text" name="address" id="address" value="${data.data && data.data.address ? data.data.address : ''}" placeholder="Enter address">
                    </label>
                    <span class="error"></span>
                </div>

                <div class="field age">
                    <label for="age" class="flex f-a-c">
                        <span>Age*:</span>
                        <input type="number" name="age" id="age" value="${data.data && data.data.age ? data.data.age : ''}" placeholder="Enter age">
                    </label>
                    <span class="error"></span>
                </div>

                <div class="field image_url">
                    <label for="image_url" class="flex f-a-c">
                        <span>Image url:</span>
                        <input type="url" name="image_url" id="image_url" value="${data.data && data.data.image_url ? data.data.image_url : ''}" placeholder="Image Url">
                    </label>
                    <span class="error"></span>
                </div>
                <div class="field">
                    <input type="submit" value="Save">
                </div>

            </div >
        </form >
    `;
    }

    return formTemplate;
}

/**
 * Populate #user-list div with items or empty div
 * @param  users 
 */
const renderUsers = (users) => {
    const container = document.getElementById('user-list');
    container.innerHTML = ''; // Clear previous content

    if (Object.entries(users).length > 0) {
        for (const [k, v] of Object.entries(users)) {
            const userHTML = userItemTemplate(v);
            container.innerHTML += userHTML;
        }
    } else {
        const userHTML = userItemTemplateEmpty();
        container.innerHTML += userHTML;
    }

    /**
     * call to animations function to make it available after render
     * call to update counter  
     */
    animations();
    updateCounter(getCount(users));
};


/**
 * animations on hover on item
 */
const animations = () => {
    let items = document.querySelectorAll('.item')
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        element.addEventListener('mouseenter', (e) => {
            e.target.classList += ' hover';
        })
        element.addEventListener('mouseleave', (e) => {
            e.target.classList.remove('hover');
        })
    }
}



function runApp() {
    renderUsers(getUsers());
}

runApp();