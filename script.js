let countdown;
let totalSeconds;
let remainingSeconds;
let timerDisplay = document.getElementById("time");
let statusDisplay = document.getElementById("status");
let progressBar = document.getElementById("progress-bar");
let resetBtn = document.getElementById("resetBtn");
let alarmSound = document.getElementById("alarmSound");
let tipText = document.getElementById("tip-text");
let modeToggle = document.getElementById("modeToggle");

// Cooking tips data
const tips = {
  "Soft Boiled": "🥚 Soft-boiled eggs have a runny yolk. Best enjoyed with toast soldiers!",
  "Medium Boiled": "🍳 Medium eggs are slightly firm but still creamy in the middle.",
  "Hard Boiled": "🥗 Hard-boiled eggs are perfect for salads and sandwiches. Peel under cold water."
};

function startTimer(minutes, type) {
  clearInterval(countdown); // reset if already running

  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;

  // Smooth fade for status
  statusDisplay.style.opacity = 0;
  setTimeout(() => {
    statusDisplay.textContent = `🍳 Cooking: ${type}`;
    statusDisplay.style.opacity = 1;
  }, 200);

  resetBtn.disabled = false;
  tipText.textContent = tips[type];

  updateDisplay(); // show starting time
  updateProgress();

  countdown = setInterval(() => {
    remainingSeconds--;

    updateDisplay();
    updateProgress();

    if (remainingSeconds <= 0) {
      clearInterval(countdown);
      statusDisplay.textContent = `✅ Done! Your ${type} egg is ready!`;
      timerDisplay.textContent = "00:00";
      progressBar.style.width = "100%";

      // Play sound + alert
      alarmSound.play();
      alert(`Your ${type} egg is ready! 🍽️`);
      resetBtn.disabled = true;
    }
  }, 1000);
}

function updateDisplay() {
  let min = Math.floor(remainingSeconds / 60);
  let sec = remainingSeconds % 60;
  timerDisplay.textContent =
    `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updateProgress() {
  let percent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  progressBar.style.width = percent + "%";
}

function resetTimer() {
  clearInterval(countdown);
  statusDisplay.textContent = "⏳ Waiting...";
  timerDisplay.textContent = "00:00";
  progressBar.style.width = "0%";
  tipText.textContent = "Choose an egg type to see tips here.";
  resetBtn.disabled = true;
}

// Dark/Light Mode toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "☀️ Light Mode";
  } else {
    modeToggle.textContent = "🌙 Dark Mode";
  }
});
