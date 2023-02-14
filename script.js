const rows = 15
const columns = 15
let mines = 40
let minesClicked = mines
let tilesClicked = 0
let board = []
let minesLocations = []
let isGameOver = false

function start(){
    document.querySelector('#mines-left').innerHTML = mines
    placeMines()

    for(let i = 0; i < rows; i++){
        let row = []
        for(let j = 0; j < columns; j++){
            let tile = document.createElement('div')
            tile.id = i.toString() + '-' + j.toString()
            tile.addEventListener('contextmenu', (event) => {
                event.preventDefault()
                rightClickTile(tile)
            })
            tile.addEventListener('click', () => {
                leftClickTile(tile)
            })
            document.querySelector('#board').append(tile)
            row.push(tile)
        }
        board.push(row)
    }
    console.log(board)
}

function rightClickTile(tile){
    if(isGameOver || tile.classList.contains('clicked')){ 
        return
    }

    if(tile.innerText == ''){
        tile.innerText = '🚩'
        minesClicked--
        document.querySelector('#mines-left').innerText = minesClicked
    }
    else if(tile.innerText == '🚩'){
        tile.innerText = ''
        minesClicked++
        document.querySelector('#mines-left').innerText = minesClicked
    }
}

function leftClickTile(tile){
    if(isGameOver || tile.classList.contains('clicked')){ 
        return
    }

    if(minesLocations.includes(tile.id)){
        showMines()
        alert("You lost!")
        isGameOver = true
        return
    }

    let coords = tile.id.split('-')
    let row = parseInt(coords[0])
    let column = parseInt(coords[1])

    checkMines(row, column)
}

function placeMines(){
    let minesLeft = mines
    while(minesLeft > 0){
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)
        let id = r.toString() + '-' + c.toString()

        if(!minesLocations.includes(id)){
            minesLocations.push(id)
            minesLeft -= 1
        }
    }
}

function showMines(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let tile = board[i][j]
            if(minesLocations.includes(tile.id)){
                tile.innerText = '💣'
                tile.style.backgroundColor = 'red'
            }
        }
    }
}

function checkMines(row, column){
    if(row < 0 || row >= rows || column < 0 || column >= columns){ // poza plansza
        return
    }
    if(board[row][column].classList.contains('clicked')){
        return
    }
    board[row][column].classList.add('clicked')
    tilesClicked++ 

    let minesFound = 0
    
    // 3 gorne
    minesFound += checkTile(row - 1, column - 1)
    minesFound += checkTile(row - 1, column)
    minesFound += checkTile(row - 1, column + 1)

    //srodkowe
    minesFound += checkTile(row, column - 1)
    minesFound += checkTile(row, column + 1)

    // 3 dolne
    minesFound += checkTile(row + 1, column - 1)
    minesFound += checkTile(row + 1, column)
    minesFound += checkTile(row + 1, column + 1)

    if(minesFound > 0){
        board[row][column].innerText = minesFound
        board[row][column].classList.add('number' + minesFound.toString())
    }
    else{
        checkMines(row - 1, column - 1)
        checkMines(row - 1, column)
        checkMines(row - 1, column + 1)
        checkMines(row, column - 1)
        checkMines(row, column + 1)
        checkMines(row + 1, column - 1)
        checkMines(row + 1, column)
        checkMines(row + 1, column + 1)
    }

    if(tilesClicked == rows * columns - mines){
        document.querySelector('#mines-left').innerText = '0'
        showMines()
        alert("You cleared all the mines")
        isGameOver = true
    }
}

function checkTile(row, column){
    if(row < 0 || row >= rows || column < 0 || column >= columns){ // poza plansza
        return 0
    }
    if(minesLocations.includes(row.toString() + '-' + column.toString())){
        return 1
    }
    return 0
}

window.onload = function(){
    console.log("aaa")
    start()
}

// MINUTA 19:00