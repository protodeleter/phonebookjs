'use_strict';

let db = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      phone: '235235',
      address: '123 Main St',
      age: 25,
      image_url: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      phone: '235235',
      address: '123 Main St',
      age: 25,
      image_url: 'https://example.com/image1.jpg',
    },
  ],
};

const getUsers = () => {
  const usersNew = db.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      age: user.age,
      image_url: user.image_url,
    };
  });

  return usersNew;
};

const getUserById = id => {
  const user = db.users.find(user => user.id === id);
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    address: user.address,
    age: user.age,
    image_url: user.image_url,
  };
};

const user_item_template = user => {
  return `
        <div class="item general-actions flex f-j-sb" id="${generate_id(5)}">

            <div class="left flex">
                <div class="name">
                    ${user.name}
                </div>
                <div class="image">
                    <img src="${user.image_url}" alt="${user.name}">
                </div>
            </div>
            <div class="right flex">
                <div class="buttons">
                    <a href="#" class="edit" id="edit"> edit </a>
                    <a href="#" class="del" id="del"> del </a>
                    <a href="#" class="info" id="info"> info </a>
                </div>
            </div>

        </div>
    `;
};
const render_users = (users, callback) => {
  const container = document.getElementById('user-list');
  container.innerHTML = ''; // Clear previous content

  users.forEach(user => {
    const userHTML = user_item_template(user);
    container.innerHTML += userHTML;
  });
};

render_users(getUsers());

const add_item = data => {
  db.users.push(data);
  render_users(getUsers());
};

const close_popup = () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
};

const open_popup = () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
};
