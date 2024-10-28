// Pilih elemen grid untuk memasukkan kartu
const grid = document.querySelector('.grid');

// Daftar pasangan kartu (gunakan angka atau gambar sesuai keinginan)
const cardsArray = [
  '🍎', '🍎',
  '🍌', '🍌',
  '🍒', '🍒',
  '🍇', '🍇',
  '🍉', '🍉',
  '🍍', '🍍',
  '🍑', '🍑',
  '🍋', '🍋'
];

// Acak kartu
function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

// Inisialisasi game
function initGame() {
  shuffle(cardsArray); // Acak kartu
  cardsArray.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;

    // Buat sisi depan dan belakang kartu
    const frontFace = document.createElement('div');
    frontFace.classList.add('front');
    const backFace = document.createElement('div');
    backFace.classList.add('back');
    backFace.textContent = card;

    // Masukkan sisi ke dalam elemen kartu
    cardElement.appendChild(frontFace);
    cardElement.appendChild(backFace);

    // Tambahkan kartu ke grid
    grid.appendChild(cardElement);

    // Event untuk klik kartu
    cardElement.addEventListener('click', flipCard);
  });
}

// Variabel untuk menyimpan status game
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Fungsi untuk membalik kartu
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // Kartu pertama dibuka
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Kartu kedua dibuka
  secondCard = this;
  checkForMatch();
}

// Cek apakah kartu cocok
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

// Matikan kartu jika cocok
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Balik kembali kartu jika tidak cocok
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 600);
}

// Reset status papan permainan
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Mulai permainan
initGame();
