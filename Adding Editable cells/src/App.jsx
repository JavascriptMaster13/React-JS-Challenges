import { useState } from 'react'
import './App.css'


function App() {
  const [cells,setCells] = useState(['a','b','c'])

 
  const edit = (value,idx)=>{
    const newCells = [...cells];
    newCells[idx] = value;
    setCells(newCells)
  }

  const addCell = (idx)=>{
    const newCells = [...cells];
    newCells.splice(idx+1,0," ");
    setCells(newCells);
  }

  return (
    <div className="App flex">
       <div className='cellsCnt flex'>
        {cells.map((cell,idx)=>(
          <div key={idx} className='flex'>
          <div className='cell flex'>
            <input value={cell}  onChange={(e)=>edit(e.target.value,idx)}/>
          </div>
          {idx<cells.length-1 && <div className='middle' onClick={()=>addCell(idx)}></div>}
          </div>
        ))}
       </div>
    </div>
  )
}

export default App
