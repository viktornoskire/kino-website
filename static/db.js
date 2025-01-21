export default function createData() {
  return {
    header: {
      mainHeader: {
        logo: './img/kinoLogo.png',
        alt: 'Picture for the brands logotype.',
        brandName: 'KINO BIO',
      },
      hamburgerMenu: {
        menuLogo: './img/kinoLogoOverlay.png',
        menuLinks: [
          {
            text: 'Aktuella filmer',
          },
          {
            text: 'Kommande filmer',
          },
          {
            text: 'Barnbio',
          },
          {
            text: 'Bioupplevelser',
          },
          {
            text: 'Barnkalas',
          },
          {
            text: 'Medlem',
          },
          {
            text: 'Om oss',
          },
        ],
      },
    },
  };
}
