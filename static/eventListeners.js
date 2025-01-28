// __Events for the info modal___________________________________________________________
if (document.querySelector('.movie-headline') || document.querySelector('.about-page')) {
  const item0 = document.querySelector('.modal-item-0');
  const item1 = document.querySelector('.modal-item-1');
  const item2 = document.querySelector('.modal-item-2');

  function addListener(li) {
    const btn = li.querySelector('.modal-open');
    const answer = li.querySelector('.modal-answer');

    btn.addEventListener('click', () => {
      btn.classList.toggle('clicked');
      if (btn.className === 'modal-open clicked') {
        btn.src = './img/QnAClose.png';
        btn.alt = 'Close button';
        answer.style.display = '';
      } else {
        btn.src = './img/QnAOpen.png';
        btn.alt = 'Open button';
        answer.style.display = 'none';
      }
    });
  }

  addListener(item0);
  addListener(item1);
  addListener(item2);
}

// __Events for the header____________________________________
const brgrMenu = document.querySelector('.hamburger-btn');
const closeBtn = document.querySelector('.close-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const overlay = document.querySelector('.overlay-blur');

brgrMenu.addEventListener('click', () => {
  (menuOverlay.style.display = 'block'), overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  (menuOverlay.style.display = 'none'), overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  (menuOverlay.style.display = 'none'), overlay.classList.remove('active');
});
