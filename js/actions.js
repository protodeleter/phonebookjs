'use_strict';

// POP UP
/**
 * popup actions
 *
 */
const close_popup = () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
};

const open_popup = () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
};

/**
 * allow to close popup clicking outsite of popup box and without clicking on close popup button
 */
document.getElementById('popup').addEventListener('click', e => {
  close_popup();
});
document.querySelectorAll('.popup .box')[0].addEventListener('click', e => {
  e.stopPropagation();
});

/**
 * close popup when clicking on close popup button
 */

const closeButton = document.getElementById('close-bttn');

closeButton.addEventListener('click', e => {
  close_popup();
});

// END POP UP

/**
 * Serch engine
 * get input value filter and render results
 */

document.getElementById('search').addEventListener('keyup', function (e) {
  let searchTerm = e.target.value;
  let searchResuls = searchFunction(searchTerm);
  renderSearchResults(searchResuls);
});

/**
 *  populate #user-list div with search results
 * @param users
 * @returns
 */
const renderSearchResults = users => {
  if (users.length === 0) return;

  const container = document.getElementById('user-list');
  container.innerHTML = ''; // Clear previous content

  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    const userHTML = userItemTemplate(getUserById(element));
    container.innerHTML += userHTML;
  }
};
/**
 * get and filter results from database
 * @param par
 * @returns array
 */
const searchFunction = par => {
  let foundKeys = [];
  for (const key in db.users) {
    let regex = new RegExp(par, 'i'); // Case-insensitive search
    let res = regex.test(db.users[key].name);
    if (res) {
      foundKeys.push(key);
    }
  }
  return foundKeys;
};

/**
 * click event listener
 */
document.addEventListener('click', function (e) {
  e.preventDefault();

  const currentClicked = e.target.closest('a'); // find closest A tag



  if (!currentClicked) return;

  const currentClickedClass = currentClicked.getAttribute('class'); // get element class attribute
  const currentClickedId = currentClicked.getAttribute('data-id'); // get element data-id attribute

  // console.log(currentClickedId, currentClickedClass, currentClicked);


  // run function depending on currentClickedClass value
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
    case 'favorite':
      toggleFavorite(currentClickedId);
      break;
    case 'tag':
      toggleSortByTag(currentClickedId, currentClicked);
      break;
    case 'del-all':
      deleteAll();
      break;
    case 'show-all-favorites':
      toggleFavorites(currentClickedId);
      break;
    default:
      break;
  }
});

function toggleFavorite(id) {
  const user = getUserById(id);

  let favoriteStatus = user.favorite; // get current favorite status
  let setStatus = favoriteStatus ? false : true;

  updateItem({
    id: user.id,
    name: user.name,
    phone: user.phone,
    address: user.address,
    age: user.age,
    image_url: user.image_url,
    favorite: setStatus,
    tags: user.tags,
  });

  //   renderUsers(sortUsersBy(getUsers(), 'favorite'));
  renderUsers(getUsers());
}
/**
 * CLear database update counter and render results
 */
const deleteAll = () => {
  db.users = {};
  updateCounter(getCount(db.users));
  renderUsers(getUsers());
};

/**
 * Delete spesific item by parameter id
 * update counter
 * remove element from DOM
 * @param id
 */
const deleteItem = id => {
  let elementToDelete = document.getElementById(id);
  if (elementToDelete) {
    elementToDelete.remove();
    delete db.users[id];
  }
  if (document.querySelectorAll('.items .item').length == 0) {
    document.querySelectorAll('.items')[0].innerHTML = userItemTemplateEmpty();
  }
  updateCounter(getCount(db.users));
};

/**
 * populate popup with info template and item data
 * @param  id
 */
const infoItem = id => {
  const user = getUserById(id);
  const popup = document.getElementById('popup-content');
  popup.innerHTML = popupTemplate({ type: 'info', data: user });

  runCallbacks({
    open_popup,
  });
};

/**
 * open popup and populate with edit form
 * @param  id
 */
const editItem = id => {
  const user = getUserById(id);
  const popup = document.getElementById('popup-content');
  popup.innerHTML = popupTemplate({ type: 'edit', data: user });

  runCallbacks({
    open_popup,
  });
};

/**
 * open popup and populate with add-new form
 */
const addNew = () => {
  const popup = document.getElementById('popup-content');
  popup.innerHTML = popupTemplate({ type: 'add' });
  runCallbacks({
    open_popup,
  });
};

const filterBy = (users, par) => {
  let asf = Object.fromEntries(
    Object.entries(users).filter(x => {

      if (par === 'favorite' && x[1].favorite === true) {
        return x;
      }

      if (x[1].tags[0] === par) {
        return x;
      }
    }),
  );

  return asf;
};

const toggleFavorites = (el) => {

  let some = document.querySelectorAll('.show-all-favorites');



}



const toggleSortByTag = (id, e) => {
  let items = document.querySelectorAll('.tags > div');
  if (e.parentNode.classList.contains('tag-active')) {
    e.parentNode.classList.remove('tag-active');
    renderUsers(getUsers());
  } else {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.classList.contains('tag-active') && element.getAttribute('data-id') !== id) {
        element.classList.remove('tag-active');
      }
    }
    e.parentNode.classList.add('tag-active');
    renderUsers(filterBy(getUsers(), id));
  }
};

const sortUsersBy = (users, par) => {
  let sortedObj = Object.fromEntries(
    Object.entries(users).sort(([, a], [, b]) => {
      if (par === 'favorite') {
        return (b[par] === true) - (a[par] === true);
      } else {
        return a[par].toLowerCase().localeCompare(b[par].toLowerCase());
      }
    }),
  );

  return sortedObj;
};

/**
 * submit event listener
 */

document.addEventListener('submit', function (e) {
  e.preventDefault();
  const formType = document.getElementById('form-type'); // get form type add-new or edit

  /**
   * input values
   */
  let name = document.getElementById('name');
  let phone = document.getElementById('phone');
  let address = document.getElementById('address');
  let age = document.getElementById('age');
  let image_url = document.getElementById('image_url');
  let id = document.getElementById('item-id');
  //   let favorite = document.getElementById('item-id');

  let itemData = {};

  /**
   * basic validation
   */
  if (!validation({ name, phone, address, age, image_url })) {
    return false;
  }

  if (formType.value === 'add-new') {
    itemData.id = generateId(5);
  } else {
    itemData.id = id.value;
  }

  /**
   * map input values and add to itemData object
   */

  itemData.name = name.value;
  itemData.phone = phone.value;
  itemData.address = address.value;
  itemData.age = age.value;
  itemData.image_url = image_url.value;
  itemData.favorite = favorite.value; // get favorite checkbox value

  switch (formType.value) {
    case 'edit':
      updateItem(itemData);
      break;
    case 'add-new':
      createItem(itemData);
      break;
    default:
      break;
  }

  updateCounter(getCount(db.users));
  runCallbacks({ close_popup });
});

/**
 * add new item to database and render results
 * @param  data
 */
const createItem = data => {
  db.users = Object.assign({ [data.id]: data }, db.users);
  renderUsers(getUsers());
};

/**
 * update spesific item and render results
 * @param data
 */

const updateItem = data => {
  db.users[data.id].name = data.name;
  db.users[data.id].address = data.address;
  db.users[data.id].age = data.age;
  db.users[data.id].image_url = data.image_url;
  db.users[data.id].phone = data.phone;
  db.users[data.id].favorite = data.favorite;

  renderUsers(getUsers());
  runCallbacks({ close_popup });
};

/**
 * Change mode feature
 *
 */
document.querySelectorAll('.change-mode').forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();

    /**
     * get id of clicked A tag
     */
    const clickedID = e.target.closest('a').getAttribute('id');
    /**
     * Prepare class string for use at <main>
     */
    let mainClass = clickedID === 'go-dark' ? 'dark' : 'light';

    /**
     * prevent click the same mode again
     */
    if (
      document.querySelectorAll('main')[0].classList.contains('dark') &&
      clickedID === 'go-dark'
    ) {
      return;
    } else if (
      document.querySelectorAll('main')[0].classList.contains('light') &&
      clickedID === 'go-light'
    ) {
      return;
    }

    /**
     * run animation function according to set class
     */
    overlayAnimation(mainClass);

    /**
     * set class on main tag
     * wait for animation to finish
     */
    setTimeout(() => {
      document.querySelectorAll('main')[0].classList = mainClass;
    }, 1000);
  });
});

/**
 * just an animation function
 * @param  cls
 */
const overlayAnimation = cls => {
  /**
   * get overlay div
   */
  let overlayDiv = document.querySelectorAll('.mode-change-overlay');

  /**
   * set overlay background
   */
  if (cls == 'dark') {
    overlayDiv[0].style.background = '#22222B';
  } else {
    overlayDiv[0].style.background = '#cfd2ff';
  }

  overlayDiv[0].style.display = 'block';
  overlayDiv[0].style.width = '100%';
  overlayDiv[0].style.transition = 'width 0.9s ease-out;';

  setTimeout(() => {
    overlayDiv[0].style.left = 'auto';
    overlayDiv[0].style.right = '0';
    overlayDiv[0].style.width = '0%';
  }, 1000);

  overlayDiv[0].style.left = '0';
  overlayDiv[0].style.right = 'auto';
};
