import { useState } from 'react'
import './App.css'

const SIZE = 3;

function isWin(board){
  const rowMap = new Map();
  const colMap = new Map();
  const diagMap = new Map();
  let result = false;
  let markedCells = 0;
  for(let r=0;r<board.length;r++){
    for(let c=0;c<board.length;c++){
      const value = board[r][c];
      if(value) markedCells++;

      if(!rowMap.get(r)) rowMap.set(r,new Set());
      if(!colMap.get(c)) colMap.set(c,new Set());

      if(r===c){
        if(!diagMap.get('left')) diagMap.set('left',new Set());
        diagMap.get('left').add(value);
      }

      if((r+c)===board.length-1){
        if(!diagMap.get('right')) diagMap.set('right',new Set());
        diagMap.get('right').add(value);
      }

      rowMap.get(r).add(value);
      colMap.get(c).add(value);
    }
  }
  rowMap.forEach(set=>{
    if(set.size===1 && !set.has(undefined)){
      result = true;
    }
  })
  colMap.forEach(set=>{
    if(set.size===1 && !set.has(undefined)){
      result = true;
    }
  })
  diagMap.forEach(set=>{
    if(set.size===1 && !set.has(undefined)){
      result = true;
    }
  })
  if(result){
    return 'win'
  }else if(markedCells === board.length*board.length){
    return 'draw'
  }
  return false;
}





function App() {
  const [board,setBoard] = useState(
    Array(SIZE).fill().map(()=>Array(SIZE).fill())
  )

  const [player,setPlayer] = useState('X');
  const [result,setResult] = useState();
    const handleClick = (rowIndex,colIndex)=>{
      if(board[rowIndex][colIndex]) return;
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = player;
      const newPLayer = player=== 'X' ? 'O' : 'X';  
      setPlayer(newPLayer);
      setBoard(newBoard);
      if(isWin(newBoard)==='win'){
        setResult(`${player} won`)
      }else if(isWin(newBoard)==='draw'){
        setResult('draw')
      }
    }

  return (
    
    <div className="App flex">
      {result && <h1>{result}</h1>}
       <div className='board flex'>
        {board.map((row,rowIndex)=>(
          <div className='row flex' key={rowIndex}>
            {row.map((value,colIndex)=>(
              <div 
                className='cell flex' 
                key={colIndex}
                style={{cursor:value ? 'not-allowed' : 'pointer'}}
                onClick={()=>handleClick(rowIndex,colIndex)}
              >{value}</div>
            ))}
          </div>
        ))}
       </div>
    </div>
  )
}

export default App
