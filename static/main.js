initHeader();

const checkKids = document.querySelector('.article-kids');

if (checkKids) {
  loadkids();
}

const checkMovies = document.querySelector('.movie-container');

if (checkMovies) {
  loadMovieContent();
}
if (document.querySelector('.info') || document.querySelector('.info-modal')) {
  buildDoc();
}

async function loadMovies() {
  const response = await fetch('./data/movies.json');
  if (!response.ok) {
    throw new Error(`HTTP-error! Status: ${response.status}`);
  }
  const movies = await response.json();

  const movieContainer = document.querySelector('.movie-container');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <i class="close-button fas fa-times"></i>
      <div class="modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  const modalBody = document.querySelector('.modal-body');
  const closeModal = document.querySelector('.close-button');

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieContainer.appendChild(movieCard);

    const movieImg = document.createElement('img');
    movieImg.src = movie.Bild;
    movieImg.alt = `Bild för ${movie.Titel}`;
    movieCard.appendChild(movieImg);

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Titel;
    movieCard.appendChild(movieTitle);

    const movieGenre = document.createElement('p');
    movieGenre.textContent = movie.Genre;
    movieCard.appendChild(movieGenre);

    movieTitle.addEventListener('click', (event) => {
      event.stopPropagation();

      modalBody.innerHTML = `
        <p><strong>Titel:</strong> ${movie.Titel}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Handling:</strong> ${movie.Beskrivning}</p>
        <p><strong>Skådespelare:</strong> ${movie.Skådespelare}</p>
        <p><strong>Språk:</strong> ${movie.Språk}</p>
        <p><strong>Rating:</strong> ${movie.Rating}</p>
        <p><strong>Speltid:</strong> ${movie.Längd}</p>
        <p><strong>Rek. ålder:</strong> ${movie.RekommenderadAlder}</p>
        <p><strong>Status:</strong> ${movie.Label}</p>`;

      modal.style.display = 'block';
    });
  });
}

async function loadMovieHeadline() {
  const response = await fetch('data/moviesHeadline.json');
  if (!response.ok) {
    throw new Error(`HTTP-error! Status: ${response.status}`);
  }
  const data = await response.json();

  const headerElement = document.querySelector('.movie-headline');
  headerElement.textContent = data.HeadlineText;
}

export async function loadMovieContent() {
  loadMovieHeadline();
  loadMovies();
}

const screenWidth = screen.width;

async function loadEvent() {
  try {
    const responseEvent = await fetch('./data/barnkalasEvent.json');

    if (!responseEvent.ok) {
      throw new Error('Could not fetch data');
    }
    const dataEvent = await responseEvent.json();
    const event = document.querySelector('.article-party');

    dataEvent.kalas.forEach((events) => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('party-div');
      event.append(eventDiv);

      const eventImg = document.createElement('img');
      eventImg.classList.add('party-img');
      eventImg.src = events.image;
      eventImg.alt = events.imageAlt;
      eventDiv.append(eventImg);

      const eventStyling = document.createElement('div');
      eventStyling.classList.add('party-styling');
      eventDiv.append(eventStyling);

      const eventHeader = document.createElement('h2');
      eventHeader.classList.add('party-header');
      eventHeader.innerText = events.titel;
      eventStyling.append(eventHeader);

      const eventText = document.createElement('p');
      eventText.classList.add('party-text');
      eventText.innerText = events.description;
      eventStyling.append(eventText);

      const eventUl = document.createElement('ol');
      eventUl.classList.add('party-list');
      eventStyling.append(eventUl);

      const content = events.content;

      content.forEach((list) => {
        const eventLi = document.createElement('li');
        eventLi.classList.add('party-listItem');
        eventLi.innerText = list;
        eventUl.append(eventLi);
      });

      const eventButton = document.createElement('button');
      eventButton.classList.add('party-button');
      eventButton.innerText = events.book;
      eventStyling.append(eventButton);
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadContent() {
  try {
    const responseContent = await fetch('./data/barnkalasContent.json');

    if (!responseContent.ok) {
      throw new Error('Could not fetch data');
    }

    const dataContent = await responseContent.json();

    const contentMainHero = document.querySelector('.div-hero');
    const info = document.querySelector('.article-kids');

    dataContent.barnkalas.forEach((content) => {
      const contentHero = document.createElement('img');
      contentHero.classList.add('kids-hero');
      if (screenWidth < 1280) {
        contentHero.src = content.imgHero;
      } else {
        contentHero.src = content.imgHeroDesktop;
      }
      contentHero.alt = content.imgAltHero;
      contentMainHero.append(contentHero);

      const contentImg = document.createElement('img');
      contentImg.classList.add('kids-img');
      if (screenWidth < 1280) {
        contentImg.src = content.imgTextMobile;
      } else {
        contentImg.src = content.imgTextDesktop;
      }
      contentImg.alt = content.imgAltMobile;
      contentMainHero.append(contentImg);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('kids-div');
      info.append(contentDiv);

      const contentHeader = document.createElement('h2');
      contentHeader.classList.add('kids-header');
      if (screenWidth < 1280) {
        contentHeader.innerText = content.titelMobile;
      } else {
        contentHeader.innerText = content.titelDesktop;
      }
      contentDiv.append(contentHeader);

      const contentButton = document.createElement('button');
      contentButton.classList.add('kids-button');
      contentButton.innerText = content.book;
      contentButton.type = 'button';
      contentDiv.append(contentButton);

      const contentMainHeader = document.createElement('h1');
      contentMainHeader.classList.add('kids-mainHeader');
      if (screenWidth < 1280) {
        contentMainHeader.innerText = content.mainTitelMobile;
      } else {
        contentMainHeader.style.display = 'none';
      }
      contentDiv.append(contentMainHeader);

      const contentText = document.createElement('p');
      contentText.classList.add('kids-text');
      if (screenWidth < 1280) {
        contentText.innerText = content.descriptionMobile;
      } else {
        contentText.innerText = content.descriptionDesktop;
      }

      contentDiv.append(contentText);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function loadkids() {
  loadEvent();
  loadContent();
}

export async function loadJSON() {
  const response = await fetch('./data/infoModal.json');
  const data = await response.json();
  return data;
}

export async function buildDoc() {
  const infoElement = document.querySelector('.info') || document.querySelector('.information');
  if (!infoElement) {
    return;
  }
  const data = await loadJSON();
  // DOM elements
  const modal = document.querySelector('.info-modal');
  const list = document.querySelector('.info-modal-list');
  const info = document.querySelector('.info');

  if (info) {
    // Render text to headerSection where the main title is
    const headSection = data.sections[0];
    const title = document.querySelector('.cinema-title');
    const open = document.querySelector('.cinema-open');
    const redButton = document.createElement('button');
    redButton.innerText = data.buttons[2].text;
    title.innerText = headSection.title;
    open.innerText = headSection.text;
    //
    const img = document.querySelector('.kino-img');
    const info2 = document.querySelector('.info-2');
    const openSection = data.sections[1].modal;
    const openTimes = openSection[3].open;
    const openTitle = document.createElement('h3');
    const openPara = document.createElement('p');
    openTitle.innerText = openSection[3].title;
    openPara.innerText = openSection[3].text;
    img.src = data.kinoImg.src;
    img.alt = data.kinoImg.alt;
    const openTimeDiv = document.createElement('div');
    openTimeDiv.appendChild(openTitle);
    openTimeDiv.appendChild(openPara);
    openTimeDiv.setAttribute('class', 'open-div');
    openTitle.setAttribute('class', 'desktop-open-title');
    openPara.setAttribute('class', 'desktop-open-paragraph');
    openTimes.forEach((i) => {
      const activity = document.createElement('div');
      const day = document.createElement('p');
      const date = document.createElement('p');
      const time = document.createElement('p');
      activity.setAttribute('class', `open-times`);
      day.setAttribute('class', 'open-times-day');
      date.setAttribute('class', 'open-times-date');
      time.setAttribute('class', 'open-times-time');
      day.innerText = i.dag;
      date.innerText = i.datum;
      time.innerText = i.tid;
      activity.appendChild(day);
      activity.appendChild(date);
      activity.appendChild(time);
      openTimeDiv.appendChild(activity);
    });
    info2.prepend(openTimeDiv);
    info.appendChild(info2);
  }
  //
  const modalInfo = data.sections[1].modal;
  let i = 0;
  modalInfo.forEach((section) => {
    // If there is no text key in section
    if (section.text == undefined) {
      const question = document.createElement('p');
      question.setAttribute('class', 'modal-title');
      question.innerText = section.title;
      // Prepend means to add it to the top of the children line
      modal.prepend(question);
      //
    } else {
      // Create elements
      const listItem = document.createElement('li');
      const question = document.createElement('p');
      const answer = document.createElement('p');
      const openBtn = document.createElement('img');
      // Set class attribute to elements
      listItem.setAttribute('class', 'modal-item-' + i);
      i++;
      question.setAttribute('class', 'modal-question');
      answer.setAttribute('class', 'modal-answer');
      openBtn.setAttribute('class', 'modal-open');
      // Use JSON data to render text to elements
      question.innerText = section.title;
      answer.innerText = section.text;
      answer.style.display = 'none';
      openBtn.src = data.buttons[0].openButton;
      openBtn.alt = data.buttons[0].alt;
      // Append to list
      listItem.appendChild(openBtn);
      listItem.appendChild(question);
      // Add event listener to img button
      openBtn.addEventListener('click', () => {
        openBtn.classList.toggle('open-button-clicked');
        if (openBtn.className === 'modal-open open-button-clicked') {
          openBtn.src = data.buttons[1].closeButton;
          openBtn.alt = data.buttons[1].alt;
          answer.style.display = '';
        } else {
          openBtn.src = data.buttons[0].openButton;
          openBtn.alt = data.buttons[0].alt;
          answer.style.display = 'none';
        }
      });
      question.addEventListener('click', () => {
        openBtn.classList.toggle('open-button-clicked');
        if (openBtn.className === 'modal-open open-button-clicked') {
          openBtn.src = data.buttons[1].closeButton;
          openBtn.alt = data.buttons[1].alt;
          answer.style.display = '';
        } else {
          openBtn.src = data.buttons[0].openButton;
          openBtn.alt = data.buttons[0].alt;
          answer.style.display = 'none';
        }
      });
      // If there's a key named 'open'
      if ('open' in section) {
        // Go through the 'open'-section
        section.open.forEach((i) => {
          const day = document.createElement('p');
          const date = document.createElement('p');
          const time = document.createElement('p');
          const activity = document.createElement('div');
          activity.setAttribute('class', `open-times`);
          day.setAttribute('class', 'open-times-day');
          date.setAttribute('class', 'open-times-date');
          time.setAttribute('class', 'open-times-time');
          day.innerText = i.dag;
          date.innerText = i.datum;
          time.innerText = i.tid;
          activity.appendChild(day);
          activity.appendChild(date);
          activity.appendChild(time);
          answer.appendChild(activity);
          listItem.appendChild(answer);
          list.appendChild(listItem);
        });
      }
      // Skip the whole open times elements and text if there is no 'open' key
      else {
        listItem.appendChild(answer);
        list.appendChild(listItem);
      }
    }
  });
}

//Getting the JSON file header.json and its data.
async function fetchHeaderData() {
  const response = await fetch('./data/header.json');
  const headerData = await response.json();
  return headerData;
}
//This function uses the data and creates the elements for the header.
function createNavigation(headerData) {
  const navigationContainer = document.querySelector('#navigation-menu');

  //Creates a nav element
  const nav = document.createElement('nav');
  nav.className = 'main-nav';

  //left side of navigation with logo and name
  const leftSection = document.createElement('div');
  leftSection.className = 'nav-left';

  const logoLink = document.createElement('a');
  logoLink.href = '/';

  const logo = document.createElement('img');
  logo.src = headerData.header.mainHeader.logo;
  logo.alt = headerData.header.mainHeader.alt;
  logo.className = 'nav-logo';

  logoLink.appendChild(logo);

  const brandNameLink = document.createElement('a');
  brandNameLink.href = '/';

  const brandName = document.createElement('span');
  brandName.className = 'brand-name';
  brandName.textContent = headerData.header.mainHeader.brandName;

  brandNameLink.appendChild(brandName);

  leftSection.appendChild(logoLink);
  leftSection.appendChild(brandNameLink);
  //the right section of the navigation meny with the hamburger menu, and its overlay on click.
  const rightSection = document.createElement('div');
  rightSection.className = 'nav-right';

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.className = 'hamburger-btn';
  hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';

  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  menuOverlay.style.display = 'none'; //Added this just so the hamburger menu i closed by default. This will probably be handled by SCSS in the future.

  const overlayBlur = document.createElement('div');
  overlayBlur.className = 'overlay-blur';

  const overlayLogoContainer = document.createElement('div');
  overlayLogoContainer.className = 'overlay-logo';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  menuOverlay.appendChild(closeBtn);

  const overlayLogo = document.createElement('img');
  overlayLogo.src = headerData.header.hamburgerMenu.menuLogo;
  overlayLogo.alt = headerData.header.mainHeader.alt;
  overlayLogo.className = 'overlay-logo';

  overlayLogoContainer.appendChild(overlayLogo);
  menuOverlay.appendChild(overlayLogoContainer);

  const menuLinks = document.createElement('ul');
  menuLinks.className = 'menu-links';
  //This loops through each link from the JSON file, and creates <li> elements for each link. Also adds the correct text.
  headerData.header.hamburgerMenu.menuLinks.forEach((link) => {
    const menuItem = document.createElement('li');
    const menuLink = document.createElement('a');
    //Using a switch that adds the href attribute depending on the link text. This can be updated when we get more webpages online.
    switch (link.text) {
      case 'Om oss':
        menuLink.href = '/about';
        break;
      case 'Barnkalas':
        menuLink.href = '/kids';
        break;
      default:
        menuLink.href = '#';
    }

    menuLink.textContent = link.text;
    menuItem.appendChild(menuLink);
    menuLinks.appendChild(menuItem);
  });

  menuOverlay.appendChild(menuLinks);

  hamburgerBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'block';
    overlayBlur.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
    overlayBlur.classList.remove('active');
  });

  overlayBlur.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
    overlayBlur.classList.remove('active');
  });
  //appending the different elements thats been created above.
  rightSection.appendChild(menuLinks.cloneNode(true));
  rightSection.appendChild(hamburgerBtn);
  nav.appendChild(leftSection);
  nav.appendChild(rightSection);
  navigationContainer.appendChild(nav);
  navigationContainer.appendChild(menuOverlay);
  navigationContainer.appendChild(overlayBlur);
}
//
export async function initHeader() {
  const headerData = await fetchHeaderData();
  createNavigation(headerData);
}
(async function startFooter() {
  try {
    const response = await fetch('./data/footer.json');
    const data = await response.json();
    const footer = document.querySelector('.footer-container');

    const sectionsContainer = document.createElement('div');
    sectionsContainer.classList.add('sections-container');

    data.footer.sections.forEach((section) => {
      const sectionDiv = document.createElement('section');
      sectionDiv.classList.add('footer-section');

      const sectionTitle = document.createElement('h4');
      sectionTitle.textContent = section.title;
      sectionDiv.append(sectionTitle);

      const ul = document.createElement('ul');

      if (section.contact) {
        section.contact.forEach((contact) => {
          const liEmail = document.createElement('li');
          liEmail.textContent = `E-post: ${contact.mail}`;
          ul.append(liEmail);
          const liPhone = document.createElement('li');
          liPhone.textContent = `Telefonnummer: ${contact.phoneNumber}`;
          ul.append(liPhone);
        });
      } else if (section.links) {
        section.links.forEach((link) => {
          const li = document.createElement('li');

          if (link.icon) {
            const icon = document.createElement('img');
            icon.src = link.icon;
            icon.alt = `${link.text || link.name} icon`;
            icon.classList.add('footer-icon');
            li.append(icon);
          }
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.text || link.name;
          a.classList.add('footer-a');
          li.append(a);
          ul.append(li);
        });
      } else if (section.adress) {
        section.adress.forEach((address) => {
          const liStreet = document.createElement('li');
          liStreet.textContent = address.street;
          ul.appendChild(liStreet);

          const liTown = document.createElement('li');
          liTown.textContent = address.town;
          ul.appendChild(liTown);

          const liFindUs = document.createElement('li');
          const aFindUs = document.createElement('a');
          aFindUs.href = address.url;
          aFindUs.textContent = address.findUs;
          aFindUs.classList.add('footer-afind');
          liFindUs.appendChild(aFindUs);
          ul.appendChild(liFindUs);
        });
      }
      sectionDiv.append(ul);
      sectionsContainer.append(sectionDiv);
    });

    footer.append(sectionsContainer);

    const span = document.createElement('span');
    span.classList.add('footer-logo-p');
    footer.append(span);

    const logo = document.createElement('img');
    logo.src = data.footer.logo;
    logo.alt = 'Kino Bio Logo';
    logo.classList.add('footer-logo');
    span.append(logo);

    const text = document.createElement('p');
    text.textContent = data.footer.text;
    text.classList.add('footer-logotext');
    span.append(text);
  } catch (error) {
    console.error('error', error);
  }
})();

async function fetchAboutJson() {
  const res = await fetch('./data/about.json');
  const data = await res.json();
  return {
    mainHeadline: data.aboutUs,
    headline: data.headline,
    aboutPage: data.aboutPage,
  };
}

export async function updateDomWithAboutJson() {
  const { mainHeadline, headline, aboutPage } = await fetchAboutJson();

  if (mainHeadline && headline && aboutPage) {
    createSections(aboutPage, headline, mainHeadline);
  }
}

function createSections(aboutData, pageHeadline, mainHeadline) {
  if (!document.querySelector('.about-page')) {
    return;
  }

  // Main headline
  const mainHeadlineElement = document.querySelector('.about-main-header');
  const mainHeading = document.createElement('h1');
  mainHeading.textContent = mainHeadline;
  mainHeadlineElement.appendChild(mainHeading);

  // Headline
  const headlineElement = document.querySelector('.about-header');
  const heading = document.createElement('h2');
  heading.textContent = pageHeadline;
  headlineElement.appendChild(heading);

  // Sektion 1
  const section1 = document.querySelector('.section-1');
  const heading1 = document.createElement('h3');
  heading1.textContent = aboutData[0].section;
  const content1 = document.createElement('p');
  content1.textContent = aboutData[0].content;
  section1.appendChild(heading1);
  section1.appendChild(content1);

  // Sektion 2
  const section2 = document.querySelector('.section-2');
  const heading2 = document.createElement('h3');
  heading2.textContent = aboutData[1].section;
  const content2 = document.createElement('p');
  content2.textContent = aboutData[1].content;
  section2.appendChild(heading2);
  section2.appendChild(content2);

  // Sektion 3
  const section3 = document.querySelector('.section-3');
  const heading3 = document.createElement('h3');
  heading3.textContent = aboutData[2].section;
  const content3 = document.createElement('p');
  content3.textContent = aboutData[2].content;
  section3.appendChild(heading3);
  section3.appendChild(content3);

  // Sektion 4
  const section4 = document.querySelector('.section-4');
  const heading4 = document.createElement('h3');
  heading4.textContent = aboutData[3].section;
  const content4 = document.createElement('p');
  content4.textContent = aboutData[3].content;
  section4.appendChild(heading4);
  section4.appendChild(content4);
}

updateDomWithAboutJson();
