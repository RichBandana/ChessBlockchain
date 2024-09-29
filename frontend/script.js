const board = document.querySelector('.chessboard');
const pieces = {
    'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔', 'p': '♙',
    'R': '♜', 'N': '♞', 'B': '♟', 'Q': '♛', 'K': '♚', 'P': '♟'
};

const initialBoard = [
    'RNBQKBNR', // Player 1's pieces (white)
    'PPPPPPPP', // Player 1's pawns (white)
    '........', // Empty rows
    '........',
    '........',
    '........',
    'pppppppp', // Player 2's pawns (black)
    'rnbqkbnr'  // Player 2's pieces (black)
];

let selectedSquare = null;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2
let player1Name = "you"; // Player 1's name
let player2Name = "your friend"; // Player 2's name
let player1Color = "white"; // Player 1's color
let player2Color = "black"; // Player 2's color

// Initialize the chessboard
function setupBoard() {
    initialBoard.forEach((row, rowIndex) => {
        row.split('').forEach((piece, colIndex) => {
            const square = document.createElement('div');
            square.className = (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black';
            square.textContent = pieces[piece] || '';
            square.addEventListener('click', () => handleSquareClick(square, rowIndex, colIndex));
            square.addEventListener('mouseover', () => handleHover(square, piece));
            square.addEventListener('mouseout', clearMessage);
            board.appendChild(square);
        });
    });
    updateTurnDisplay();


}

// Handle hover effect
function handleHover(square, piece) {
    const message = document.getElementById('message');
    const pieceName = getPieceName(piece);

    if (selectedSquare) {
        // Do not show messages when a piece is selected
        return;
    }

    if ((currentPlayer === 1 && square.textContent && square.classList.contains('your-piece')) ||
        (currentPlayer === 2 && square.textContent && square.classList.contains('your-piece'))) {
        message.textContent = `${currentPlayer === 1 ? player1Name : player2Name}'s ${pieceName}`;
    } else if (square.textContent) {
        message.textContent = `${currentPlayer === 1 ? player2Name : player1Name}'s ${pieceName}`;
    }
}

// Clear message on mouse out
function clearMessage() {
    const message = document.getElementById('message');
    message.textContent = '';
}

// Get the name of the piece
function getPieceName(piece) {
    const pieceNames = {
        '♖': 'Rook', '♘': 'Knight', '♗': 'Bishop', '♕': 'Queen', '♔': 'King', '♙': 'Pawn',
        '♜': 'Rook', '♞': 'Knight', '♟': 'Pawn', '♛': 'Queen', '♚': 'King'
    };
    return pieceNames[piece] || 'Piece';
}

// Handle square clicks and enforce turn-based play
function handleSquareClick(square, row, col) {
    const playerColor = currentPlayer === 1 ? player1Color : player2Color;

    // Clear previous highlights and dims
    clearHighlightsAndDims();

    // Prevent moving the opponent's pieces
    if ((playerColor === 'white' && square.classList.contains('black')) ||
        (playerColor === 'black' && square.classList.contains('white'))) {
        displayMessage(`${currentPlayer === 1 ? player1Name : player2Name} cannot move opponent's piece`);
        return;
    }

    // Highlight your pieces
    if (selectedSquare) {
        const moveValid = validateMove(selectedSquare, square);
        if (!moveValid) {
            displayMessage("Invalid move. Please try again.");
            return;
        }

        // Perform the move and check for captures, etc.
        if (square.textContent) {
            if (currentPlayer === 1) {
                player1Score += calculateScore(square.textContent);
            } else {
                player2Score += calculateScore(square.textContent);
            }
            updateScoreboard();
        }

        square.textContent = selectedSquare.textContent;
        selectedSquare.textContent = '';
        selectedSquare.classList.remove('highlight'); // Remove highlight from the selected piece
        selectedSquare = null;

        // Switch players
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateTurnDisplay();
    } else {
        selectedSquare = square;
        selectedSquare.classList.add('highlight'); // Highlight selected piece
    }
}

// Clear highlights and dims
function clearHighlightsAndDims() {
    const squares = board.querySelectorAll('.chessboard div');
    squares.forEach(sq => {
        sq.classList.remove('highlight', 'dim', 'your-piece');
        if (currentPlayer === 1 && sq.textContent && sq.textContent === pieces[sq.textContent.toLowerCase()]) {
            sq.classList.add('your-piece'); // Highlight your pieces
        }
        if (currentPlayer === 2 && sq.textContent && sq.textContent === pieces[sq.textContent.toUpperCase()]) {
            sq.classList.add('your-piece'); // Highlight your pieces
        }
    });
}

// Validate move (basic example)
function validateMove(fromSquare, toSquare) {
    // Basic validation: can't move to a square with the same color piece
    if (toSquare.textContent && toSquare.classList.contains('your-piece')) {
        return false; // Invalid move
    }
    return true;
}

// Calculate the score based on the captured piece
function calculateScore(piece) {
    const pieceValues = {
        '♖': 5, '♘': 3, '♗': 3, '♕': 9, '♔': 0, '♙': 1,
        '♜': 5, '♞': 3, '♟': 3, '♛': 9, '♚': 0, '♟': 1
    };
    return pieceValues[piece] || 0;
}

// Update the scoreboard
function updateScoreboard() {
    document.getElementById('score1').textContent = player1Score;
    document.getElementById('score2').textContent = player2Score;
}

// Update the turn display
function updateTurnDisplay() {
    document.getElementById('turn').textContent = `${currentPlayer === 1 ? player1Name : player2Name}'s Turn`;
}

// Display a message to the user
function displayMessage(msg) {
    document.getElementById('message').textContent = msg;
}

// Reset game function
document.getElementById('reset').addEventListener('click', () => {
    selectedSquare = null;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    updateScoreboard();
    updateTurnDisplay();
    board.innerHTML = ''; // Clear the board
    setupBoard(); // Reset the board
});

// Set up the board initially
setupBoard();
function getMockWalletAddress() {
    return '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  let playerWallet = getMockWalletAddress();
  console.log("Player Wallet Address: " + playerWallet);

  function getMockReward() {
    // Random reward between 0.001 and 0.01 "mock" tokens
    return (Math.random() * (0.01 - 0.001) + 0.001).toFixed(4);
  }
  
  // Simulate player making a move
  function playerMove() {
    let reward = getMockReward();
    console.log("Player earned: " + reward + " mock tokens for the move!");
    
    // You can update the UI with this reward
    document.getElementById("reward-display").innerText = `You earned: ${reward} tokens`;
  }

  function storePlayerData(wallet, reward) {
    let totalRewards = parseFloat(localStorage.getItem('totalRewards')) || 0;
    totalRewards += parseFloat(reward);
    localStorage.setItem('totalRewards', totalRewards.toFixed(4));
    
    localStorage.setItem('playerWallet', wallet);
    console.log("Player data stored.");
  }
  
  // Retrieve stored data
  function loadPlayerData() {
    let wallet = localStorage.getItem('playerWallet') || "No wallet connected.";
    let totalRewards = localStorage.getItem('totalRewards') || 0;
    console.log(`Wallet: ${wallet}, Total Rewards: ${totalRewards} tokens`);
    
    // Display on UI
    document.getElementById("wallet-display").innerText = `Wallet: ${wallet}`;
    document.getElementById("total-rewards").innerText = `Total Rewards: ${totalRewards} tokens`;
  }

  function mockContractCall() {
    console.log("Interacting with mock smart contract...");
    
    // Simulate a contract function like "claim reward"
    setTimeout(() => {
      console.log("Mock contract call successful! Rewards claimed.");
    }, 2000);
  }
  function mockContractCall() {
    console.log("Interacting with mock smart contract...");
    
    // Simulate a contract function like "claim reward"
    setTimeout(() => {
      console.log("Mock contract call successful! Rewards claimed.");
    }, 2000);
  }
    
