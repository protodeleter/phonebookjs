'use_strict';

const close_button = document.getElementById('close-bttn');
const add_new = document.getElementById('add-new');
const edit = document.getElementById('edit');
const info = document.getElementById('info');



close_button.addEventListener('click', function (e) {
    close_popup();
})


add_new.addEventListener('click', function (e) {
    e.preventDefault();

    console.log('testest');

    open_popup();
})