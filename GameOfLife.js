class GameOfLife {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.board = this.makeBoard();
    }

    randomize() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                this.board[i][j] = Math.round(Math.random());
            }
        }
    }

    /**
     * Returns a 2D Array
     */
  
    makeBoard() {
      // TODO: Create and return an 2D Array 
      // with `this.heigh` as rows and `this.width` as cols.
      // For example, given a height of 4 and a width of 3, it will generate:
      // [ 
      //  [0, 0, 0],
      //  [0, 0, 0],
      //  [0, 0, 0],
      //  [0, 0, 0],
      // ]
      let grid = [];
      for (let i = 0; i < this.height; i++) {
        let row = [];
        for (let j = 0; j < this.width; j++) {
          row.push(0);
        }
        grid.push(row);
      }
      return grid;
    }
  
    getCell(row, col) {
        if(row < 0 || col < 0 || col >= this.width || row >= this.height) {
            return;
        }   
        return this.board[row][col];
    }

    setCell(value, row, col) {
        this.board[row][col] = value;
    }

    toggleCell(row, col) {
        const dead = 0;
        const alive = 1;
        if(this.board[row][col] === dead) {
            this.board[row][col] = alive;   
        } else {
            this.board[row][col] = dead;
        }
    }

    /**
     * Return the amount of living neighbors around a given coordinate.
     */
  
    livingNeighbors(row, col) {
      // TODO: Return the count of living neighbors.
        if(row < 0 || col < 0 || col >= this.width || row >= this.height) {
            return;
        }   
        let neighbors = 0;
        const dead = 0;
        const alive = 1;

        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(this.getCell(row + i, col + j) === alive) {
                    neighbors++;
                }
            }
        }

        /*
        if(this.board[row - 1][col - 1] !== undefined && this.board[row - 1][col - 1] === alive) {
            neighbors++;
        } 
        if(this.board[row][col - 1] !== undefined && this.board[row][col - 1] === alive ) {
            neighbors++;
        }
        if(this.board[row + 1][col - 1] !== undefined && this.board[row + 1][col - 1] === alive) {
            neighbors++;
        }
        if(this.board[row - 1][col] !== undefined && this.board[row - 1][col] === alive) {
            neighbors++;
        }
        if(this.board[row + 1][col] === alive && this.board[row + 1][col] !== undefined) {
            neighbors++;
        }
        if(this.board[row - 1][col + 1] === alive && this.board[row - 1][col + 1] === undefined) {
            neighbors++;
        }
        if(this.board[row][col + 1] === alive && this.board[row][col + 1] !== undefined) {
            neighbors++;
        }
        if(this.board[row + 1][col + 1] === alive && this.board[row + 1][col + 1] !== undefined) {
            neighbors++;
        }
        */
       if(this.getCell(row, col) === dead) {
        return neighbors;
       }
       return neighbors - 1;
    }
  

    conwayRule(currentCell, amountOfNeighbors) {
        let isAlive = currentCell === 1;
        if (isAlive) {
            if (amountOfNeighbors === 2 || amountOfNeighbors === 3) {
            return 1;
            } else {
            return 0;
            }
        } else if (amountOfNeighbors === 3) {
            return 1;
        } else {
            return 0;
        }
    }
  
    /**
     * Given the present board, apply the rules to generate a new board
     */
    
    tick() {
        // TODO: Here is where you want to loop through all the cells
        // on the existing board and determine, based on it's neighbors,
        // whether the cell should be dead or alive in the new board 
        // (the next iteration of the game) 
        //
        // You need to:
        // 1. Count alive neighbors for all cells
        // 2. Set the next state of all cells in newBoard,
        // based on their current alive neighbors
        let newBoard = this.makeBoard();
        let amountOfNeighbors = 0;
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                amountOfNeighbors = this.livingNeighbors(i, j);
                newBoard[i][j] = this.conwayRule(this.getCell(i, j), amountOfNeighbors);
            }
        }
        this.board = newBoard;
    }
    
  } 
