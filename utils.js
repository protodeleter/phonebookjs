'use_strict';


const generateId = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


const updateCounter = (count) => {

  document.getElementById('count').innerHTML = count;

}

const getCount = (items) => {

  return Object.entries(items).length
}


const runCallbacks = funcs_obj => {
  const objEntr = Object.entries(funcs_obj);
  if (objEntr.length > 0) {
    for (const element of objEntr) {
      element[1]()
    }
  }
};


document.addEventListener('keyup', (e) => {
  if (e.target.tagName === "INPUT") {
    document.querySelectorAll('div.' + e.target.id + ' .error')[0].innerHTML = "";
  }
})


const validation = (fieldsObj) => {
  let checkLength = '';
  for (const key in fieldsObj) {
    if (Object.prototype.hasOwnProperty.call(fieldsObj, key)) {
      const element = fieldsObj[key];
      checkLength = checkInputLength(element.value, key);
    }
  }
  if (checkLength) {
    return true;
  }
  return false;
}


const checkInputLength = (input, name) => {
  if (input.length <= 0) {
    document.querySelector('div.' + name + ' .error').innerHTML = "Field is empty";
    return false;
  }
  return true
}
