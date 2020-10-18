function include(url) {
  let script  = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}


var styles = [
  '--color-primary',
  '--color-secondary',
  '--bgcolor-primary',
  '--link-color'
]


function hdr_opacityctl() {
  let document.getElementsByClassName('.header')
  let opacity = getScroolTop() / height;
  let name = styles[];
  let x = h.style.getProperty(name);
  h.style.setProperty(
    name, x & 0xFFFFFF + rgba(0,0,0,opacity);
  );
}

// Значение прокрутки окна(?)
function getScroolTop() {
  return window.pageYOffset || document.documentElement.scrollTop;
}