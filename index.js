/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let score = [0, 0, 0, 0, 0, 0, 0, 0] //[row1, row2, row3, col1, col2, col3, diag1, diag2]

function updateScore(row, col, point) {
    row = Number(row);
    col = Number(col);

    score[row] += point;
    score[GRID_LENGTH + col] += point;
    if (row == col) score[2 * GRID_LENGTH] += point;
    if (GRID_LENGTH - 1 - col == row) score[2 * GRID_LENGTH + 1] += point;

    console.log(score);
    for (let i = 0; i < 8; i++) {
        if (Math.abs(score[i]) === 3)
            return true
    }


    // console.log(`${initial}`)
    // console.log(`${final}`)
}

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    // console.log(grid);
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" id="' + colIdx + rowIdx + '"  class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    addClickHandlers();
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    removeClickHandler(colIdx, rowIdx)
    renderMainGrid();

    if (updateScore(colIdx, rowIdx, 1)) {
        alert('player wins');
        removeAllClickHandlers();
    }
    else
        computerMove();
    // console.log(grid);
}

function getAvailableBox() {
    var rowIdx = Math.floor(Math.random() * 3);
    var colIdx = Math.floor(Math.random() * 3);
    if (grid[colIdx][rowIdx] === 0) return {rowIdx, colIdx}
    else
        return getAvailableBox()
}

function computerMove() {
    const {rowIdx, colIdx} = getAvailableBox();
    let newValue = 2;
    grid[colIdx][rowIdx] = newValue;
    if (updateScore(colIdx, rowIdx, -1)) {
        alert('comp wins');
        removeAllClickHandlers();
    }
    else {
        removeClickHandler(colIdx, rowIdx)
        renderMainGrid();
    }

    // console.log(grid);
}

function removeClickHandler(colIdx, rowIdx) {
    setTimeout(() => {
        var box = document.getElementById(`${colIdx}${rowIdx}`)
        box.removeEventListener('click', onBoxClick, false);
    }, 0);

}

function removeAllClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
