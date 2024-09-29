const chessRules = {
    pieces: {
        king: {
            count: 1,
            movement: "Moves one square in any direction.",
            description: "The king is the most important piece; if it is checkmated, the game is over."
        },
        queen: {
            count: 1,
            movement: "Moves any number of squares in any direction.",
            description: "The most powerful piece on the board."
        },
        rook: {
            count: 2,
            movement: "Moves any number of squares horizontally or vertically.",
            description: "Can move to any square in its row or column."
        },
        bishop: {
            count: 2,
            movement: "Moves any number of squares diagonally.",
            description: "Can move to any square in its diagonal."
        },
        knight: {
            count: 2,
            movement: "Moves in an L-shape: two squares in one direction and then one square perpendicular.",
            description: "Can jump over other pieces."
        },
        pawn: {
            count: 8,
            movement: "Moves forward one square, or two squares from its starting position; captures diagonally.",
            description: "Can promote to any piece upon reaching the opposite end."
        }
    },

    isMoveValid: function(piece, fromSquare, toSquare) {
        // Implement piece-specific movement logic here
        return true; // Placeholder for logic implementation
    }
};

// Example of usage:
console.log(chessRules.pieces.king.movement); // Output: Moves one square in any direction.
