//return the current key 
let key = {
  'a': false, 
  'd': false, 
  'w': false, 
  's': false, 
  'q': false, 
  'e': false, 
}; 

let mouse;
let mouseMove;
  
function events(element) {
  element.addEventListener('keydown', event => {
    if (event.key == 'a') {
      key['a'] = true;
      key['d'] = false; 
    } 

    if (event.key == 'd') {
      key['d'] = true;
      key['a'] = false; 
    } 

    if (event.key == 'w') {
      key['w'] = true;
      key['s'] = false; 
    } 

    if (event.key == 's') {
      key['s'] = true;
      key['w'] = false; 
    } 

    if (event.key == 'q') {
      key['q'] = true;
      key['e'] = false; 
    } 

    if (event.key == 'e') {
      key['e'] = true;
      key['q'] = false; 
    } 
  });  
  
  element.addEventListener('keyup', event => {
    if (event.key == 'a') {
      key['a'] = false;
    }

    if (event.key == 'd') {
      key['d'] = false;
    }

    if (event.key == 'w') {
      key['w'] = false;
    }

    if (event.key == 's') {
      key['s'] = false;
    }

    if (event.key == 'q') {
      key['q'] = false;
    }

    if (event.key == 'e') {
      key['e'] = false;
    }
  });

  element.addEventListener('mousedown', event => {
    mouse = true;
  });

  element.addEventListener('mouseup', event => {
    mouse = false;
  });

  element.addEventListener('mousemove', event => {
    mouseMove = event;
  });
}
  
export { events, key, mouse, mouseMove }