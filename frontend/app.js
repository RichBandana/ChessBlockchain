const myContract = new web3.eth.Contract(contractABI, contractAddress);

let player1Wallet = 0; // Wallet for Player 1
let player2Wallet = 0; // Wallet for Player 2
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2

async function creditPlayerWallet(player, moveQuality) {
    const reward = calculateReward(moveQuality);
    if (player === 1) {
        player1Wallet += reward;
        await myContract.methods.creditWallet(player1Wallet).send({ from: /* Player 1 address */ });
    } else {
        player2Wallet += reward;
        await myContract.methods.creditWallet(player2Wallet).send({ from: /* Player 2 address */ });
    }
    console.log(`Player ${player} credited with ${reward} tokens!`);
}

function calculateReward(moveQuality) {
    return moveQuality === 'good' ? 10 : 20; 
}

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    const connectWalletButton = document.getElementById('connectWallet');
    const walletAddressDisplay = document.getElementById('walletAddressDisplay'); // Adjusted for ID

    connectWalletButton.addEventListener('click', async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // Display the connected wallet address
            walletAddressDisplay.innerText = `Wallet Address: ${account}`; // Updated to display the connected account

            // Initialize Web3 with the current provider
            const web3 = new Web3(window.ethereum);
            console.log('Web3 initialized:', web3);
        } catch (error) {
            console.error('User denied account access:', error);
        }
    });
} else {
    console.log('MetaMask is not installed. Please install it to use this app.');
}

// Function to generate a mock wallet address
function getMockWalletAddress() {
    return '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Function to get a mock reward for each move
function getMockReward() {
    // Random reward between 0.001 and 0.01 "mock" tokens
    return (Math.random() * (0.01 - 0.001) + 0.001).toFixed(4);
}

// Simulate player making a move and earning a reward
function playerMove() {
    let reward = getMockReward();
    console.log("Player earned: " + reward + " mock tokens for the move!");

    // Update the UI with the reward
    document.getElementById("reward-display").innerText = `You earned: ${reward} tokens`;

    // Store the player data
    storePlayerData(playerWallet, reward);
    loadPlayerData(); // Update the UI with total rewards
}

// Store player wallet and reward data in localStorage
function storePlayerData(wallet, reward) {
    let totalRewards = parseFloat(localStorage.getItem('totalRewards')) || 0;
    totalRewards += parseFloat(reward);
    localStorage.setItem('totalRewards', totalRewards.toFixed(4));
    localStorage.setItem('playerWallet', wallet);
    console.log("Player data stored.");
}

// Retrieve and display stored player data
function loadPlayerData() {
    let wallet = localStorage.getItem('playerWallet') || "No wallet connected.";
    let totalRewards = localStorage.getItem('totalRewards') || 0;
    document.getElementById("wallet-display").innerText = `Wallet: ${wallet}`;
    document.getElementById("total-rewards").innerText = `Total Rewards: ${totalRewards} tokens`;
}

// Mock function to simulate interacting with a smart contract
function mockContractCall() {
    console.log("Interacting with mock smart contract...");

    // Simulate a delay for the contract interaction
    setTimeout(() => {
        console.log("Mock contract call successful! Rewards claimed.");
        alert("Rewards claimed successfully!");
    }, 2000);
}

// Generate a mock wallet address when the player starts the game
let playerWallet = getMockWalletAddress();
console.log("Player Wallet Address: " + playerWallet);

// Load any previously stored data (wallet and rewards)
loadPlayerData();
let chessGameContract;
let playerWalletAddress;

// Assuming you have web3 set up
async function init() {
    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
    const abi = [ /* Add the ABI of your contract here */ ];
    chessGameContract = new web3.eth.Contract(abi, contractAddress);
    
    playerWalletAddress = document.getElementById('walletAddress').innerText.split(": ")[1];
    updateEarnings();
}

async function playGame() {
    try {
        await chessGameContract.methods.playGame().send({ from: playerWalletAddress });
        updateEarnings();
    } catch (error) {
        console.error(error);
    }
}

async function withdrawEarnings() {
    try {
        await chessGameContract.methods.withdrawEarnings().send({ from: playerWalletAddress });
        updateEarnings();
    } catch (error) {
        console.error(error);
    }
}

async function updateEarnings() {
    const earnings = await chessGameContract.methods.checkEarnings().call({ from: playerWalletAddress });
    document.getElementById('total-rewards').innerText = `${earnings} tokens`;
}

// Call init on page load
window.onload = init;
let chessGameContract;
let playerWalletAddress;

// Replace with your actual deployed contract address
const contractAddress = "0x5861Ca2BE5D0ea532e0300FA1447Ce89A401F8c4"; // Example address, replace with your deployed contract address

// Replace with your actual contract ABI
const abi = [
    // Add the ABI of your contract here
    {
        "inputs": [],
        "name": "playGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawEarnings",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "checkEarnings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "receive"
    }
];

// Initialize the contract and update earnings on load
async function init() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        chessGameContract = new web3.eth.Contract(abi, contractAddress);
        playerWalletAddress = document.getElementById('walletAddress').innerText.split(": ")[1];
        updateEarnings();
    } else {
        alert('Please install MetaMask to use this feature!');
    }
}

// Function to play the game
async function playGame() {
    try {
        await chessGameContract.methods.playGame().send({ from: playerWalletAddress });
        updateEarnings();
    } catch (error) {
        console.error(error);
    }
}

// Function to withdraw earnings
async function withdrawEarnings() {
    try {
        await chessGameContract.methods.withdrawEarnings().send({ from: playerWalletAddress });
        updateEarnings();
    } catch (error) {
        console.error(error);
    }
}

// Function to update and display earnings
async function updateEarnings() {
    const earnings = await chessGameContract.methods.checkEarnings().call({ from: playerWalletAddress });
    document.getElementById('total-rewards').innerText = `${earnings} tokens`;
}

// Call init on page load
window.onload = init;
// Assuming you have a way to determine the network in your app.js
document.getElementById("current-network").innerText = `Network: ${web3.eth.net.getNetworkType()}`;
document.getElementById("contract-address").innerText = `Contract Address: ${contractAddress}`;

function calculateReward(move) {
    // Example of dynamic reward calculation based on move complexity
    const baseReward = 1; // Base reward for each move
    let moveReward = baseReward;

    if (move.flags.includes('c')) {
        // Reward higher for captures
        moveReward += 1;
    }
    if (move.flags.includes('k')) {
        // Reward higher for checkmate
        moveReward += 3;
    }
    return moveReward;
}

function playerMove() {
    const move = game.move(moveString); // Assuming moveString contains the player's move
    if (move === null) {
        console.log("Invalid move");
        return;
    }

    const reward = calculateReward(move);
    playerEarnings[currentPlayer] += reward;
    document.getElementById('reward-display').innerText = `You earned ${reward} tokens for this move!`;
    document.getElementById('total-rewards').innerText = `${playerEarnings[currentPlayer]} tokens`;
}
function updateLeaderboard() {
    document.getElementById('leaderboardPlayer1').innerText = `${playerEarnings['Player 1']} tokens`;
    document.getElementById('leaderboardPlayer2').innerText = `${playerEarnings['Player 2']} tokens`;
}

function playerMove() {
    const move = game.move(moveString);
    if (move === null) {
        console.log("Invalid move");
        return;
    }

    const reward = calculateReward(move);
    playerEarnings[currentPlayer] += reward;
    document.getElementById('reward-display').innerText = `You earned ${reward} tokens for this move!`;
    document.getElementById('total-rewards').innerText = `${playerEarnings[currentPlayer]} tokens`;

    // Update leaderboard
    updateLeaderboard();
}

// Ensure that the JS file is loaded and working
document.addEventListener('DOMContentLoaded', function () {
    console.log('app.js is loaded'); // Debugging purpose
    alert('JavaScript file is loaded and working'); // Simple alert to check JS execution

    // Mock contract call function
    function mockContractCall() {
        const gasFee = 0.01; // Mock gas fee for transactions
        const totalTokens = playerEarnings[currentPlayer] || 0;

        if (totalTokens > 0) {
            playerEarnings[currentPlayer] = 0;
            const transactionMessage = `Claimed ${totalTokens} tokens with gas fee of ${gasFee} ETH.`;
            document.getElementById('total-rewards').innerText = "0 tokens";

            // Add transaction to history
            const transactionHistory = document.getElementById('transaction-history');
            const listItem = document.createElement('li');
            listItem.innerText = transactionMessage;
            transactionHistory.appendChild(listItem);

            alert(transactionMessage);
        } else {
            alert('No tokens to claim.');
        }
    }

    // Calculate rewards function
    function calculateReward(moveQuality) {
        // Simulating dynamic rewards based on move quality
        let baseReward = 1; // Base reward in tokens
        if (moveQuality === "good") {
            return baseReward * 2; // Double rewards for good moves
        } else if (moveQuality === "great") {
            return baseReward * 3; // Triple rewards for great moves
        }
        return baseReward; // Default reward for standard moves
    }

    // Assign functions to global scope for button event handlers
    window.mockContractCall = mockContractCall;
    window.calculateReward = calculateReward;
});


// Mock function to simulate reward assignment after a player move
function playerMove() {
    let moveQuality = "good"; // Assume the player made a good move
    let reward = calculateReward(moveQuality);
    
    // Update total rewards (mock logic)
    let totalRewards = document.getElementById('total-rewards');
    let currentRewards = parseInt(totalRewards.textContent);
    totalRewards.textContent = currentRewards + reward + " tokens";
    
    // Display the reward for this move
    document.getElementById('reward-display').textContent = `You earned ${reward} tokens for this move!`;
}
let leaderboard = [];

function updateLeaderboard(playerName, rewards) {
    let player = leaderboard.find(p => p.name === playerName);
    if (player) {
        player.score += rewards;
    } else {
        leaderboard.push({ name: playerName, score: rewards });
    }

    displayLeaderboard();
}

function displayLeaderboard() {
    let leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";
    
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score in descending order
    
    leaderboard.forEach(player => {
        let playerInfo = document.createElement('p');
        playerInfo.textContent = `${player.name}: ${player.score} tokens`;
        leaderboardDiv.appendChild(playerInfo);
    });
}

// Call this function after the player claims rewards or after a game
function mockContractCall() {
    let playerName = document.getElementById('player1Name').value || 'Player 1'; // Assume Player 1
    let rewards = parseInt(document.getElementById('total-rewards').textContent);

    // Update leaderboard and reset rewards
    updateLeaderboard(playerName, rewards);
    document.getElementById('total-rewards').textContent = "0 tokens";
    document.getElementById('reward-display').textContent = "Rewards claimed!";
}
let proposals = [];

function createProposal(description) {
    proposals.push({ description, votes: 0 });
    displayProposals();
}

function voteOnProposal(index) {
    proposals[index].votes++;
    displayProposals();
}

function displayProposals() {
    let proposalDiv = document.getElementById('proposals');
    proposalDiv.innerHTML = "<h2>DAO Proposals</h2>";

    proposals.forEach((proposal, index) => {
        let proposalElement = document.createElement('div');
        proposalElement.innerHTML = `<p>${proposal.description} - Votes: ${proposal.votes}</p>
        <button onclick="voteOnProposal(${index})">Vote</button>`;
        proposalDiv.appendChild(proposalElement);
    });
}
// Function to mock player move and calculate rewards
function playerMove() {
    let moveQuality = "good"; // Assume the player made a good move
    let reward = calculateReward(moveQuality);
    
    let totalRewards = document.getElementById('total-rewards');
    let currentRewards = parseInt(totalRewards.textContent);
    totalRewards.textContent = currentRewards + reward + " tokens";
    
    document.getElementById('reward-display').textContent = `You earned ${reward} tokens for this move!`;
    
    alert("Move made! You've earned rewards based on your move.");
}

// Function to mock claiming rewards
function mockContractCall() {
    let playerName = document.getElementById('player1Name').value || 'Player 1';
    let rewards = parseInt(document.getElementById('total-rewards').textContent);

    updateLeaderboard(playerName, rewards);
    document.getElementById('total-rewards').textContent = "0 tokens";
    document.getElementById('reward-display').textContent = "Rewards claimed!";
    
    alert("Rewards claimed! Your earnings have been added to the leaderboard.");
}

// Function to mock withdrawing earnings
function withdrawEarnings() {
    alert("Withdrawing earnings! This is where a real blockchain interaction would happen.");
}

// Function to reset the game
function resetGame() {
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    document.getElementById('score1').textContent = '0';
    document.getElementById('score2').textContent = '0';
    document.getElementById('total-rewards').textContent = '0 tokens';
    document.getElementById('reward-display').textContent = '';
    alert("Game has been reset.");
}

// Function to mock creating a proposal in the DAO
function createProposal(description) {
    proposals.push({ description, votes: 0 });
    displayProposals();
    alert("Proposal created successfully!");
}

// Adding event listeners for buttons
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('connectWallet').addEventListener('click', () => alert("MetaMask connection initiated!"));

document.getElementById('reset').addEventListener('click', resetGame);


const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/058b3c53d6d84f37b25be9edf326514e");

// Replace with your deployed contract address from Sepolia
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";  // Replace with actual deployed address
const contractABI = [
  // ABI for the ChessGame contract, you can copy this from Truffle's build output
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Connecting to MetaMask and handling wallet connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      document.getElementById("wallet-display").innerText = accounts[0];
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    alert("MetaMask is not installed!");
  }
}

// Handle player move (mock interaction)
function playerMove() {
  alert("Player move made! Game logic goes here.");
  // Add logic to interact with the contract, e.g. to submit a move
}

// Mock function for claiming rewards (simulate contract call)
async function mockContractCall() {
  const accounts = await web3.eth.getAccounts();
  const rewardAmount = 10;  // Replace with real interaction logic
  alert(`Claimed ${rewardAmount} tokens!`);
}

// Event listeners for buttons
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("reset").addEventListener("click", () => {
  alert("Game reset!");
});
document.getElementById("claimRewards").addEventListener("click", mockContractCall);
document.getElementById("withdrawEarnings").addEventListener("click", () => {
  alert("Earnings withdrawn (mock)!");
});




