'use_strict';

/**
 * generate id for database items
 * @param  length
 * @returns
 */
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
/**
 * update html with items number
 * @param  count
 */
const updateCounter = count => {
  document.getElementById('count').innerHTML = count;
};

/**
 * get number of existing entries from items object
 */
const getCount = items => {
  return Object.entries(items).length;
};

/**
 * recieve object of functions and call every fuinction in the object
 * @param funcs_obj
 */
const runCallbacks = funcs_obj => {
  const objEntr = Object.entries(funcs_obj);
  if (objEntr.length > 0) {
    for (const element of objEntr) {
      element[1]();
    }
  }
};

/**
 * valdate all inputs in fieldsObj
 * @param  fieldsObj
 * @returns
 */
const validation = fieldsObj => {
  let checkLength = '';
  for (const key in fieldsObj) {
    if (Object.prototype.hasOwnProperty.call(fieldsObj, key)) {
      const element = fieldsObj[key];
      /**
       * hide error div when typing
       */
      element.addEventListener('keyup touchend', e => {
        if (e.target.tagName === 'INPUT') {
          document.querySelectorAll(
            'div.' + e.target.id + ' .error',
          )[0].innerHTML = '';
        }
      });

      checkLength = checkInputLength(element.value, key);
    }
  }
  if (checkLength) {
    return true;
  }
  return false;
};

/**
 * check input length
 * if empty populate .error div with error message
 * return false if empty
 * @param  input
 * @param  name
 * @returns
 */
const checkInputLength = (input, name) => {
  if (input.length <= 0) {
    document.querySelector('div.' + name + ' .error').innerHTML =
      'Field is empty';
    return false;
  }
  return true;
};
