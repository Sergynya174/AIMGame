const startBtn = document.querySelector("#start");
const screen = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#CD5C5C",
  "#FFA07A",
  "#FFC0CB",
  "#FF1493",
  "#FF6347",
  "#FF7F50",
  "#FFA500",
  "#FFFF00",
  "#FFD700",
  "#F0E68C",
  "#E6E6FA",
  "#7B68EE",
  "#ADFF2F",
  "#006400",
  "#00FF00",
  "#008080",
  "#00FFFF",
  "#87CEFA",
  "#1E90FF",
  "#0000FF",
  "#FFE4C4",
  "#F0FFF0",
];

let time = 0;
let score = 0;
let isGameFinished = false;

startBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  screen[0].classList.add("up");
});

timeList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("time-btn")) {
    time = parseInt(evt.target.getAttribute("data-time"));
    screen[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("circle")) {
    score++;
    evt.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0 && !isGameFinished) {
    finishGame();
    isGameFinished = true;
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.remove();
  board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
