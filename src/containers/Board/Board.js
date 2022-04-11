import './Board.scss';
import Cell from '../Cell/Cell';
import { main } from 'engine/main'


const standartFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

const fenToBoard = (fen = standartFen) => {
    const board = [];
    for (let i = 0; i < fen.length; i++) {
        const char = fen[i];

        const isLetter = char.toLowerCase() !== char.toUpperCase();

        if (isLetter) {
          const color = char === char.toUpperCase() ? 'w' : 'b';
          const pieceName = color + char.toUpperCase();
          board.push(pieceName);
        }

        const isNumber = !isNaN(char);

        if (isNumber) {
            for (let j = 0; j < +char; j++) {
                board.push(0);
            }
        }
    }

    return board;

}

const PIECES =  { EMPTY : 0, wP : 1, wN : 2, wB : 3,wR : 4, wQ : 5, wK : 6, bP : 7, bN : 8, bB : 9, bR : 10, bQ : 11, bK : 12  };


const gameBoard = {
  board: Array(120),
  side: 0,
  fiftyMoveCount: 0,
  plyCount: 0,
  enPas: 0,
  searchTreeDepth: 0,
  castlePermission: 0,
  pieceCounter: [],
  pieceList: Array(140),
  posKey: 0

};

function randomizeKey() {
	return (Math.floor((Math.random() * 255) + 1) << 23)
      | (Math.floor((Math.random() * 255) + 1) << 16)
		  | (Math.floor((Math.random() * 255) + 1) << 8)
      | Math.floor((Math.random() * 255) + 1);
}

const boardRepresentation = new Array(120);

const getChessCellIndex = (file, rank) => {
  return (21 + file) + (rank * 10);
}

const filesArray = Array(120).fill(100);
const ranksArray = Array(120).fill(100);


const initBoard = () => {
  const board = Array(120).fill(100);

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const cell = getChessCellIndex(file, rank);

      filesArray[cell] = file;
      ranksArray[cell] = rank;
    }
  }

  console.log(filesArray, ranksArray)
}

const pieceHashKeys = Array(14 * 120);
let sideKey = null;
const castleKeys = Array(16);

const initHashKeys = () => {
  for (let i = 0; i < pieceHashKeys.length; i++) {
    pieceHashKeys[i] = randomizeKey();
  }

  sideKey = randomizeKey();

  for (let i = 0; i < 16; i++) {
    castleKeys[i] = randomizeKey();
  }
}

initBoard();

main()

const generatePosKey = () => {
  // for (let sq = 0; i < 120; sq++) {
  //   const piece = gameBoard.board[sq];

  //   if (piece !== 0)
  // }
}



const mock = fenToBoard();


const checkIfCellIsOdd = (i) => {
  const isOddRow = Math.floor(i / 8) % 2 === 0;
  const isOddIndex = i % 2 === 0;

  return isOddRow ? !isOddIndex : isOddIndex;
};

const mapBoard = (value, i) => {
  const props = {
    isOdd: checkIfCellIsOdd(i),
    value
  };
  return <Cell {...props} />;
};

function Board() {
    fenToBoard();
  return (
    <div className="board">
        { mock.map(mapBoard) }
    </div>
  );
}

export default Board;
