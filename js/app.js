// cards to be observed
const cards = document.querySelectorAll('.card');

// create observer object:
const observer = new IntersectionObserver(
  // callback:
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);
      // stop observing when entry is visible:
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  // options:
  {
    threshold: 0.8,
    rootMargin: '0px 0px 50px 0px',
  }
);

// Lazy Load
const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'));
  },
  {
    rootMargin: '100px',
  }
);

lastCardObserver.observe(document.querySelector('.card:last-child'));

// observe each card
cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelector('.card-container');

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New Card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}
