'use_strict';
const actions = () => {
  const close_button = document.getElementById('close-bttn');
  const add_new = document.getElementById('add-new');
  const edit = document.getElementById('edit');
  const info = document.getElementById('info');

  close_button.addEventListener('click', e => {
    close_popup();
  });

  add_new.addEventListener('click', e => {
    e.preventDefault();

    add_item([
      {
        id: 1,
        name: 'John Doe',
        phone: '235235',
        address: '123 Main St',
        age: 25,
        image_url: 'https://example.com/image1.jpg',
      },
      {
        id: 1,
        name: 'Johnasfasf',
        phone: '235235',
        address: '123 Main St',
        age: 25,
        image_url: 'https://example.com/image1.jpg',
      },
    ]);

    open_popup();
  });

  edit.addEventListener('click', e => {
    e.preventDefault();
    open_popup();
  });

  info.addEventListener('click', e => {
    e.preventDefault();
    open_popup();
  });
};

actions();
