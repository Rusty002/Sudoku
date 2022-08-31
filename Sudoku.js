const b = null;

// Dummy board
const board1 = [
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b]
];

// Simple Board
const board2 = [
    [1, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, 8, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, 3, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, 9]
];

// Unsolvable Board
const board3 = [
    [1, 2, 3, 4, 5, 6, 7, 8, b],
    [b, b, b, b, b, b, b, b, 2],
    [b, b, b, b, b, b, b, b, 3],
    [b, b, b, b, b, b, b, b, 4],
    [b, b, b, b, b, b, b, b, 5],
    [b, b, b, b, b, b, b, b, 6],
    [b, b, b, b, b, b, b, b, 7],
    [b, b, b, b, b, b, b, b, 8],
    [b, b, b, b, b, b, b, b, 9]
];

// Solvable Board
const board4 = [
    [1, 2, 3, 4, 5, 6, 7, 8, b],
    [b, b, b, b, b, b, b, b, 2],
    [b, b, b, b, b, b, b, b, 3],
    [b, b, b, b, b, b, b, b, 4],
    [b, b, b, b, b, b, b, b, 5],
    [b, b, b, b, b, b, b, b, 6],
    [b, b, b, b, b, b, b, b, 7],
    [b, b, b, b, b, b, b, b, 8],
    [b, b, b, b, b, b, b, b, 1]
];
 
function solveBoard(board){
    if(solvedBoard(board)){
        return board
    }
    else{
        const possibilities = nextBoards(board);
        const validBoards = keepValid(possibilities);
        return searchForSolution(validBoards)
    }
}

function searchForSolution(boards){
    if(boards.length < 1){
        return false
    }
    else{
        // Backtrackking Search For Solution
        var first = boards.shift();
        const tryPath = solveBoard(first);
        if (tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}


function solvedBoard(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] === null){
                return false
            }
        }
    }
    return true
}


function nextBoards(board){
    var res=[];
    const firstEmpty = findEmptySquare(board) // should return an empty index
    if(firstEmpty != undefined){
        const y = firstEmpty[0];
        const x = firstEmpty[1];
        for(let i = 1; i <9; i++){
            var newBoard = [...board];
            var row = [...newBoard[y]];
            row[x]=i;
            newBoard[y]=row;
            res.push(newBoard);
        }
    }
    return res;
}


function findEmptySquare(board){
    // board -> [int,int]
    for(let i =0; i < 9; i++){
        for(let j =0; j < 9; j++){
            if(board[i][j]==null){
                return [i,j]
            }
        }
    } 
}

function keepValid(boards){
    return boards.filter((b) => validBoard(b))
}

function validBoard(board){
    return rowGood(board) && columnGood(board) && boxesGood(board)
}

function rowGood(board){
    for(let i = 0; i < 9; i++){
        var cur =[];
        for(let j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j]);
            }
        }
    }
    return true;
}

function columnGood(board){
    for(let i = 0; i < 9; i++){
        var cur =[];
        for(let j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i]);
            }
        }
    }
    return true;
}

function boxesGood(board){
    const boxCoordinates=[
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];

    for (let y  = 0; y < 9; y += 3){
        for(let x = 0; x < 9; x += 3){
            var cur = [];
            for(let i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]];
                coordinates[0] += y;
                coordinates[1] += x;
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if(board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]]);
                }
            }
        }
    }
    return true;
}

console.log(solveBoard(board1));
console.log(solveBoard(board2));
console.log(solveBoard(board3));
