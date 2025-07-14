const socket = io();
let timer;

function startLocalGame() {
  alert("Local PvP mode started");
}

function startAIGame() {
  const difficulty = prompt("Select AI difficulty: Easy, Medium, Hard");
  alert(`AI mode: ${difficulty}`);
}

function createPrivateRoom() {
  socket.emit("createRoom");
}

function joinPrivateRoom() {
  const code = document.getElementById("roomCode").value;
  socket.emit("joinRoom", code);
}

function startRandomMatch() {
  socket.emit("findMatch");
}

function startTimer() {
  let seconds = 10;
  document.getElementById("timer").innerText = `Move Timer: ${seconds}s`;
  timer = setInterval(() => {
    seconds--;
    document.getElementById("timer").innerText = `Move Timer: ${seconds}s`;
    if (seconds === 0) {
      clearInterval(timer);
      autoRandomMove();
    }
  }, 1000);
}

function autoRandomMove() {
  alert("Auto-move triggered!");
}

function exportGameHistory() {
  const gameHistory = "Sample move history...";
  const blob = new Blob([gameHistory], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "daadi_game_history.txt";
  link.click();
}

socket.on("roomCreated", (roomCode) => {
  alert(`Room created. Share this code: ${roomCode}`);
});

socket.on("joinedRoom", () => {
  alert("Joined room successfully!");
});