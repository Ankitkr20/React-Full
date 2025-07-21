import React,{useState} from 'react'

function App(){

  const [count, setCount] = useState(1);

  const addValue = () =>{
    if(count < 20){
      setCount(count + 1);
    }
  }
  const removeValue = () =>{
    if(count > 0){
      setCount(count - 1);
    }
  }
return(
  <>
  <h1>Counter:{count}</h1>
  <button onClick={addValue}>Add{count}</button>
  <button onClick={removeValue}>Remove{count}</button>
  </>
)
}
export default App;