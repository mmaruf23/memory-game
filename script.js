// Pilih elemen grid untuk memasukkan kartu

const backgroundMusic = new Audio('music.mp3');
backgroundMusic.loop = true; // Mengulangi musik
backgroundMusic.play();

const flipSound = new Audio('flip.mp3');
const matchSound = new Audio('match.mp3');

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

let moves = 0;
let timer = 0;
let timerInterval;
let isGameStarted = false;

// Update elemen HTML untuk timer dan skor
const timerElement = document.getElementById('timer');
const movesElement = document.getElementById('moves');

// Fungsi untuk memulai timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = `Time: ${timer}s`;
  }, 1000);
}

// Update jumlah gerakan
function updateMoves() {
  moves++;
  movesElement.textContent = `Moves: ${moves}`;
}

// Mulai permainan dan reset semua status
function initGame() {
  shuffle(cardsArray);
  grid.innerHTML = '';
  moves = 0;
  timer = 0;
  isGameStarted = false;
  clearInterval(timerInterval);
  timerElement.textContent = 'Time: 0s';
  movesElement.textContent = 'Moves: 0';

  // Sisa kode initGame() seperti sebelumnya
  cardsArray.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front');
    const backFace = document.createElement('div');
    backFace.classList.add('back');
    backFace.textContent = card;

    cardElement.appendChild(frontFace);
    cardElement.appendChild(backFace);
    grid.appendChild(cardElement);

    cardElement.addEventListener('click', flipCard);
  });
}

// Variabel untuk menyimpan status game
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Fungsi untuk membalik kartu
function flipCard() {
  flipSound.play();
  if (lockBoard) return;
  if (this === firstCard) return;

  // Mulai timer ketika kartu pertama dibuka
  if (!isGameStarted) {
    isGameStarted = true;
    startTimer();
  }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // Kartu pertama dibuka
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Kartu kedua dibuka
  secondCard = this;
  updateMoves(); // Tambah gerakan saat membuka dua kartu
  checkForMatch();
}

// Cek apakah kartu cocok
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();

  // Cek apakah game selesai
  if (document.querySelectorAll('.flip').length === cardsArray.length) {
    clearInterval(timerInterval); // Hentikan timer
    setTimeout(() => alert(`Game completed in ${moves} moves and ${timer} seconds!`), 500);
  }
}

// Matikan kartu jika cocok
function disableCards() {
  matchSound.play();
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
  }, 1000);
}

// Reset status papan permainan
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Mulai permainan
initGame();

