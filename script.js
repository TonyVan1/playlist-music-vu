$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const colorCells = $('.body-color');
const root = $(':root');
const rootVar = getComputedStyle(root);
const modalClose = $('.modal-close');
const modalOpen = $('.btn-color');
const container = $('.container');
const overlay = $('.overlay');

modal = {
  colors: [
    '#10006b', '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#00fffff', '#ff00ff', '#C0C0C0', '#808080', '#800000',
    '#808000', '#008000', '#800080', '#008080', '#000080', '#00CCCC'],
  render: function () {
    const htmls = this.colors.map((color) => {
      return `
      <div class="color__cell">
        <div class="color__block" style="background-color: ${color};"></div>
        <div class="color__name">${color}</div>
      </div>
    `;
    });
    colorCells.innerHTML = htmls.join("");
  },
  addEvent: function() {
    colorCells.onclick = function(e) {
      var newColor = e.target.style.backgroundColor;
      console.log(newColor);
      if (newColor){
        root.style.setProperty('--primary-color', newColor);
        localStorage.setItem('panelTheme',newColor);
      }
    }
  },
  // check and use theme of user
  checkTheme: function() {
    const colorDefault = localStorage.getItem('panelTheme');
    if (colorDefault) return this.loadTheme(colorDefault);
    else return this.loadTheme("#10006b");
  },
  // Load theme
  loadTheme: function(color) {
    root.style.setProperty('--primary-color', color);
  },
  hangedEvent: function() {
    // when click open menu icon
    modalOpen.addEventListener('click', function(){
      overlay.classList.add('open');
      container.classList.add('open');
    });
    // when click close menu icon
    modalClose.addEventListener('click', function(){
      overlay.classList.remove('open');
      container.classList.remove('open');
    });
    // when click ovelay to close
    overlay.addEventListener('click', function(){
      overlay.classList.remove('open');
      container.classList.remove('open');
    });

  },
  start: function() {
    this.checkTheme();
    this.render();
    this.addEvent();
    this.hangedEvent();
  }
};

modal.start();