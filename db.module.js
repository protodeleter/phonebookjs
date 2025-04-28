'use_scrict';

let db = {
    users:
    {
        [generate_id(5)]: {
            id: generate_id(5),
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

export default db;