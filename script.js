document.addEventListener("DOMContentLoaded", function () {
    const dot = document.getElementById("dot");
    const restartButton = document.getElementById("restart-button");
    const settingsButton = document.getElementById("settings-button");
    const saveSettingsButton = document.getElementById("save-settings");
    const closeSettingsButton = document.getElementById("close-settings");
    const gameContainer = document.getElementById("game-container");
    const timerElement = document.getElementById("timer");
    const scoreElement = document.getElementById("score");
    const gameTimeInput = document.getElementById("game-time");
    const autoStartCheckbox = document.getElementById("auto-start");
    const messageContainer = document.getElementById("message-container");
    const finalScoreElement = document.getElementById("final-score");
    const playAgainButton = document.getElementById("play-again");
    const dotColorInput = document.getElementById("dot-color");
    const bgColorInput = document.getElementById("bg-color");

    let score = 0;
    let gameRunning = false;
    let gameTime = 30;
    let timer;

    function randomPosition() {
        const containerRect = gameContainer.getBoundingClientRect();
        const dotSize = dot.offsetWidth;

        const x = Math.random() * (containerRect.width - dotSize);
        const y = Math.random() * (containerRect.height - dotSize);

        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
    }

    function updateScore() {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateTimer() {
        let timeLeft = gameTime;
        timerElement.textContent = `Time: ${timeLeft}`;

        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        gameRunning = false;
        dot.style.pointerEvents = "none"; // Make dot unclickable
        messageContainer.style.display = "block";
        finalScoreElement.textContent = score;
    }

    function resetGame() {
        clearInterval(timer);
        score = 0;
        gameRunning = false;
        dot.style.pointerEvents = "auto";
        scoreElement.textContent = `Score: 0`;
        timerElement.textContent = `Time: ${gameTime}`;
        messageContainer.style.display = "none";

        // Start the timer if auto-start is checked
        if (autoStartCheckbox.checked) {
            gameRunning = true;
            updateTimer();
        }
    }

    dot.addEventListener("click", function () {
        if (!gameRunning) {
            gameRunning = true;
            updateTimer();
        }
        if (gameRunning) {
            updateScore();
            randomPosition();
        }
    });

    restartButton.addEventListener("click", resetGame);
    playAgainButton.addEventListener("click", resetGame);

    saveSettingsButton.addEventListener("click", function () {
        gameTime = parseInt(gameTimeInput.value, 10) || 30;
        timerElement.textContent = `Time: ${gameTime}`;
        closeSettingsButton.click();
    });

    closeSettingsButton.addEventListener("click", function () {
        document.getElementById("settings-modal").style.display = "none";
    });

    settingsButton.addEventListener("click", function () {
        document.getElementById("settings-modal").style.display = "flex";
    });

    dotColorInput.addEventListener("change", function () {
        dot.style.backgroundColor = dotColorInput.value;
    });

    bgColorInput.addEventListener("change", function () {
        gameContainer.style.backgroundColor = bgColorInput.value;
    });

    randomPosition(); // Position the dot initially
});
