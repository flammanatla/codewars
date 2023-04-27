//////////////Sudoku validator
function validateSudoku(board) {
  const arrayOfColumnSets = Array.from({ length: 9 }, () => new Set());
  const arrayOfRowSets = [];
  const arrayOfBoxSets = [];

  for (const [index, row] of board.entries()) {
    if (row.includes(0)) {
      // if board contains 0 - it is invalid
      return false;
    } else {
      // create sets of rows
      createSet(index, row, "row", arrayOfRowSets);
      //console.log("array of Row sets: ", arrayOfRowSets);
      if (!isSetCorrect(arrayOfRowSets[index])) return false;

      // create sets of columns
      createSet(null, row, "column", arrayOfColumnSets);
      //console.log('array of Column sets: ', arrayOfColumnSets);
    }
  }

  // create set of boxes
  createSet(null, null, "box", arrayOfBoxSets, board);
  //console.log(`arrayOfBoxSets`, arrayOfBoxSets);

  // console.log(
  //   `is board correct?`,
  //   finalCheck(arrayOfRowSets, arrayOfColumnSets, arrayOfBoxSets)
  // );
  return finalCheck(arrayOfRowSets, arrayOfColumnSets, arrayOfBoxSets);
}

const createSet = (index, row, type, setList, board) => {
  if (type === "row") {
    setList[index] = new Set(row);
  } else if (type === "column") {
    row.forEach((el, i) => setList[i].add(el));
  } else if (type === "box") {
    // Imagine sudoku board as set of boxes with numbers 1-9,
    // 1 | 2 | 3
    // ---------
    // 4 | 5 | 6
    // ---------
    // 7 | 8 | 9
    // We need to check boxes with numbers 1, 2, 4 and 5 to ensure that whole board is correct
    // (it is enough to have 2 correct boxes in a row or column in order to confirm whole row/column is correct)
    // Lets number them as 0, 1, 2, 3 (00, 01, 10 and 11 in binary)
    [0, 1, 2, 3].forEach((el) => {
      setList.push(
        createBoxSet(
          board,
          el.toString(2).padStart(2, "0").split("").map(Number) // here we translate decimal to binary
        )
      );
    });
  }
};

// create a set for each box.
// Use box number in binary form [0, 0], [0, 1], [1, 0], [1, 1] to calculate the start indexes for each box.
// box 00 needs to contain elements [0, 1, 2] from first 3 rows (board[0, 1, 2])
// box 01 needs to contain elements [3, 4, 5] from first 3 rows (board[0, 1, 2])
// box 10 needs to contain elements [0, 1, 2] from second 3 rows (board[3, 4, 5])
// box 01 needs to contain elements [3, 4, 5] from second 3 rows (board[3, 4, 5])
const createBoxSet = (board, [box_row, box_col]) => {
  const boxArray = [0, 1, 2].map((position) =>
    board[box_row * 3 + position].slice(box_col * 3, box_col * 3 + 3)
  );
  return new Set(boxArray.flat());
};

const isSetCorrect = (set) => set.size === 9;

const finalCheck = (rows, columns, boxes) => {
  const isBoardCorrect =
    rows.every(isSetCorrect) &&
    columns.every(isSetCorrect) &&
    boxes.every(isSetCorrect);

  return isBoardCorrect;
};

module.exports = {
  validateSudoku,
};
