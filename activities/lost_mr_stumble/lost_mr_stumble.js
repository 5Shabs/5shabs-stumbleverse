// Game Variables
let timeLeft = 15; // Time limit for the game in seconds
let gameRunning = false;
let gemsEarned = 0;
let playerPosition = { x: 0, y: 0 }; // Player starts at the top-left corner
const mazeSize = 12; // Define a 12x12 grid
let maze; // Holds the maze structure

// DOM Elements
const startButton = document.getElementById("startButton");
const mazeBoard = document.getElementById("mazeBoard");
const timerDisplay = document.getElementById("timer");
const gemDisplay = document.getElementById("gemDisplay");

// Function to Start the Game
function startGame() {
    // Reset game variables
    timeLeft = 15;
    gemsEarned = 0;
    playerPosition = { x: 0, y: 0 };
    gameRunning = true;

    // Update UI
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    gemDisplay.textContent = `Gems Earned: ${gemsEarned}`;
    startButton.style.display = "none"; // Hide the start button

    // Generate and display the maze
    maze = generateValidMaze(mazeSize);
    displayMaze();

    // Start the timer
    const timer = setInterval(() => {
        if (!gameRunning) {
            clearInterval(timer);
            return;
        }
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false); // End the game if the timer runs out
        }
    }, 1000);

    // Enable player movement
    document.addEventListener("keydown", movePlayer);
}

// Function to End the Game
function endGame(win) {
    gameRunning = false;
    document.removeEventListener("keydown", movePlayer);

    if (win) {
        timerDisplay.textContent = "You Win!";
        calculateGems();
    } else {
        timerDisplay.textContent = "Time's Up!";
    }

    // Update Gems in UI
    gemDisplay.textContent = `Gems Earned: ${gemsEarned}`;
    updateTotalGems(gemsEarned); // Add earned gems to the global total
    displayGems(); // Refresh the total gems display globally

    // Show Restart Button
    startButton.textContent = "Restart Game";
    startButton.style.display = "block";
}

// Function to Calculate Gems Earned
function calculateGems() {
    if (timeLeft >= 14) {
        gemsEarned = 10; // 14-15 seconds left
    } else if (timeLeft >= 13) {
        gemsEarned = 9;
    } else if (timeLeft >= 12) {
        gemsEarned = 8;
    } else if (timeLeft >= 11) {
        gemsEarned = 7;
    } else if (timeLeft >= 10) {
        gemsEarned = 6;
    } else if (timeLeft >= 9) {
        gemsEarned = 5;
    } else if (timeLeft >= 7) {
        gemsEarned = 4;
    } else if (timeLeft >= 5) {
        gemsEarned = 3;
    } else if (timeLeft >= 3) {
        gemsEarned = 2;
    } else {
        gemsEarned = 1; // 1-2 seconds left
    }
}

// Function to Generate a Valid Maze
function generateValidMaze(size) {
    let maze;
    do {
        maze = generateMaze(size);
    } while (!isSolvable(maze, { x: 0, y: 0 }, { x: size - 1, y: size - 1 }));
    return maze;
}

// Function to Generate a Random Maze
function generateMaze(size) {
    const maze = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(Math.random() > 0.3 ? 0 : 1); // 70% path, 30% wall
        }
        maze.push(row);
    }
    // Ensure start and finish positions are always paths
    maze[0][0] = 0;
    maze[size - 1][size - 1] = 0;
    return maze;
}

// Function to Check if the Maze is Solvable
function isSolvable(maze, start, end) {
    const visited = Array.from({ length: maze.length }, () =>
        Array(maze.length).fill(false)
    );

    function dfs(x, y) {
        // Out of bounds or visited or wall
        if (
            x < 0 ||
            x >= maze.length ||
            y < 0 ||
            y >= maze.length ||
            visited[x][y] ||
            maze[x][y] === 1
        ) {
            return false;
        }

        // Reached the end
        if (x === end.x && y === end.y) {
            return true;
        }

        visited[x][y] = true; // Mark as visited

        // Explore in all four directions
        return (
            dfs(x - 1, y) || // Up
            dfs(x + 1, y) || // Down
            dfs(x, y - 1) || // Left
            dfs(x, y + 1) // Right
        );
    }

    return dfs(start.x, start.y);
}

// Function to Display the Maze
function displayMaze() {
    mazeBoard.innerHTML = ""; // Clear previous maze
    maze.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            if (cell === 1) cellDiv.classList.add("wall");
            if (rowIndex === playerPosition.x && colIndex === playerPosition.y) {
                cellDiv.classList.add("player");
                const playerImg = document.createElement("img");
                playerImg.src = "../../assets/mr_stumble.png";
                playerImg.alt = "Mr Stumble";
                playerImg.style.width = "100%";
                playerImg.style.height = "100%";
                cellDiv.appendChild(playerImg);
            }
            if (rowIndex === mazeSize - 1 && colIndex === mazeSize - 1) {
                cellDiv.classList.add("exit");
            }
            mazeBoard.appendChild(cellDiv);
        });
    });
}

// Function to Move the Player
function movePlayer(event) {
    if (!gameRunning) return; // Prevent movement when the game isn't running

    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (event.key) {
        case "ArrowUp":
            newX--;
            break;
        case "ArrowDown":
            newX++;
            break;
        case "ArrowLeft":
            newY--;
            break;
        case "ArrowRight":
            newY++;
            break;
        default:
            return; // Ignore other keys
    }

    event.preventDefault(); // Prevent default browser behavior (e.g., scrolling)

    // Validate move (ensure within bounds and not a wall)
    if (
        newX >= 0 &&
        newX < mazeSize &&
        newY >= 0 &&
        newY < mazeSize &&
        maze[newX][newY] === 0
    ) {
        playerPosition = { x: newX, y: newY };
        displayMaze(); // Update the maze display with the new position
        checkWin(); // Check if the player reached the exit
    }
}

// Function to Check for Win Condition
function checkWin() {
    const { x, y } = playerPosition;
    if (x === mazeSize - 1 && y === mazeSize - 1) {
        endGame(true); // Player wins the game
    }
}

// Event Listener for Start Button
startButton.addEventListener("click", startGame);
