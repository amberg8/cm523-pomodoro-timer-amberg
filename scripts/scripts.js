/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
// INFORMATION BUTTON//

const infoBtns = document.querySelectorAll(".info-btn");
const infoBox = document.querySelector("#info-box");
// settings button/change times//
const settingsBtns = document.querySelectorAll(".settings-btn");
const settingsBox = document.querySelector("#settings-box");

function createEvents(nodes, trigger) {
  nodes.forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      const computedStyle = window.getComputedStyle(trigger);
      if (computedStyle.display === "none") {
        trigger.style.display = "block";
      } else {
        trigger.style.display = "none";
      }
    });
  });
}

createEvents(settingsBtns, settingsBox);
createEvents(infoBtns, infoBox);

// Activate buttons//

const modeBarBtns = document.querySelectorAll(".bar-btn");
const controlBtns = document.querySelectorAll(".control-btn");

function activateBtn(nodes) {
  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      if (!node.classList.contains("active")) {
        nodes.forEach((otherNode) => {
          if (otherNode !== node) {
            otherNode.classList.remove("active");
          }
        });
        node.classList.add("active");
        updateTime();
        updateTimer();
      }
    });
  });
}

// Timer types //

const pomodoroInput = document.getElementById("pomodoro");
const shortBreakInput = document.getElementById("short-break");
const longBreakInput = document.getElementById("long-break");

let pomodoroTime = pomodoroInput.value;
let shortBreakTime = shortBreakInput.value;
let longBreakTime = longBreakInput.value;

pomodoroInput.addEventListener("change", () => {
  pomodoroTime = pomodoroInput.value;
  updateTime();
  updateTimer();
});

shortBreakInput.addEventListener("change", () => {
  shortBreakTime = shortBreakInput.value;
  updateTime();
  updateTimer();
});

longBreakInput.addEventListener("change", () => {
  longBreakTime = longBreakInput.value;
  updateTime();
  updateTimer();
});

const time = document.querySelector(".time");
let seconds;
const pomodoroTab = document.querySelector(".pomodoro-btn");
const shortBreakTab = document.querySelector(".short-break-btn");
const longBreakTab = document.querySelector(".long-break-btn");

function updateTime() {
  if (pomodoroTab.classList.contains("active")) {
    seconds = pomodoroTime * 60;
  } else if (shortBreakTab.classList.contains("active")) {
    seconds = shortBreakTime * 60;
  } else if (longBreakTab.classList.contains("active")) {
    seconds = longBreakTime * 60;
  }
}
//Defualt timer needs to be set//
function updateTimer() {
  let timeRemaining =
    ("0" + Math.floor(seconds / 60)).slice(-2) +
    ":" +
    ("0" + (seconds % 60)).slice(-2);
  time.innerHTML = timeRemaining;
}

const activeBtn = document.querySelector(".bar-btn.active");
let interval;
let isPaused;

const play = document.getElementById("play-btn");
const playIcon = document.querySelector(".fa-solid.fa-play");
play.addEventListener("click", () => {
  playIcon.classList.toggle("fa-play");
  playIcon.classList.toggle("fa-pause");
  if (playIcon.classList.contains("fa-pause")) {
    play.classList.add("active");
    playIcon.classList.add("active");
    isPaused = false;
    startTimer();
  } else {
    isPaused = true;
    clearInterval(interval);
    play.classList.remove("active");
    playIcon.classList.remove("active");
  }
});

let stop = document.getElementById("stop-btn");
stop.addEventListener("click", () => {
  clearInterval(interval);
  updateTime();
  updateTimer();
  if (playIcon.classList.contains("fa-pause")) {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    play.classList.remove("active");
    playIcon.classList.remove("active");
  }
});
// after work timer ends, navbar does not switch to short break!//
const cyclesNumber = document.querySelector(".cycles");
let cyclesLeft = 4;
cyclesNumber.innerHTML = cyclesLeft;

function startTimer() {
  document.title = "Pomodoro Cycle";
  interval = setInterval(() => {
    if (!isPaused) {
      seconds--;
    }
    updateTimer();
    if (seconds === 0) {
      clearInterval(interval);
      cyclesLeft--;
      cyclesNumber.innerHTML = cyclesLeft;
      pomodoroTab.classList.remove("active");
      if (cyclesLeft > 0) {
        shortBreakTab.classList.add("active");
        updateTime();
        updateTimer();
        shortBreakTimer();
      } else {
        longBreakTab.classList.add("active");
        updateTime();
        updateTimer();
        longBreakTimer();
      }
    }
  }, 1000);
}

function shortBreakTimer() {
  document.title = "Pomodoro - Short Break";
  interval = setInterval(() => {
    seconds--;
    updateTimer();
    if (seconds === 0) {
      clearInterval(interval);
      shortBreakTab.classList.remove("active");
      pomodoroTab.classList.add("active");
      updateTime();
      updateTimer();
      startTimer();
    }
  }, 1000);
}
//Highlighing long break does not change timer. settings function is not being saved for short/long//
function longBreakTimer() {
  document.title = "Pomodoro - Long Break";
  interval = setInterval(() => {
    seconds--;
    updateTimer();
    if (seconds === 0) {
      alert("Pomodoro finished!");
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
      play.classList.remove("active");
      playIcon.classList.remove("active");
      clearInterval(interval);
      longBreakTab.classList.remove("active");
      pomodoroTab.classList.add("active");
      updateTime();
      updateTimer();
      cyclesLeft = 4;
      cyclesNumber.innerHTML = cyclesLeft;
    }
  }, 1000);
}

updateTime();
updateTimer();
activateBtn(modeBarBtns);
