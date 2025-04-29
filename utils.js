'use_strict';

const run_callback = func2 => {
  if (typeof func2 == 'function') return func2();
};

const generate_id = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


const update_counter = (count) => {

  document.getElementById('count').innerHTML = count;

}

const get_count = (items) => {

  return Object.entries(items).length
}


const run_callbacks = funcs_obj => {
  const objEntr = Object.entries(funcs_obj);
  if (objEntr.length > 0) {
    for (const element of objEntr) {
      element[1]()
    }
  }
};
