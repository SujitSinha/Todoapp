import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import Button from '@material-ui/core/Button';

function App() {
  const [item, setItem] = useState("");
  const initialData = localStorage.toDos ? JSON.parse(localStorage.toDos) : [];
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    e.preventDefault();
    setItem(e.target.value);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([{content:item,submitted:false,visible:true},...data]);
    setItem("");
  }
 

  function highlightText() {
    let toDos = data;
    
    for(let a in document.getElementsByClassName('Todos')){
      if( document.getElementsByClassName('Todos').hasOwnProperty(a)){
        document.getElementsByClassName('Todos')[a].innerHTML = (document.getElementsByClassName('Todos')[a].innerHTML.replace(/#([^ ]+)/g, `<span class="highlight">#$1</span>`));
  }
  }
}





  useEffect(() => {
    localStorage.toDos = JSON.stringify(data);
    highlightText();
    
  });
  

 const completed=(i,e)=>{
  if(e.target.className==="highlight")
   {
    let hashText=e.target.innerHTML;
     var fullTodo=[...data];
     fullTodo.forEach((td)=>
     {
      if(!td.content.includes(hashText) && td.visible)
      { 
      td.visible = false;
      }
     }); 
    setData(fullTodo);
     
   }
   else

  
  {
   let toDo = [...data];
   if(!toDo[i].submitted) {
   toDo[i].submitted = true;
  toDo.splice(toDo.length-1,0,toDo.splice(i,1)[0])
   setData(toDo);
   }
   }
 }
 const clearFilter=()=>{
   let toDos=[...data];
   toDos.forEach(toDo=>toDo.visible = true);
   setData(toDos);
 }





  return (
    <div className="body">
      <div className="App">
      <form onSubmit={handleSubmit}>
        <input id="inp" type="text" name="input" value={item}
          placeholder="Type any Task" onChange={handleChange} />
        <Button variant="contained" type="submit" color="primary">Add</Button>
      </form>
      </div>
      <div className="list-container"> 
      <Button variant="contained" onClick={clearFilter} color="default" size="small" className="filter-button"> Clear Filter</Button>
      {data.map((lists, index) => {
        return (   
          lists.visible &&
          <li key={index}
           className={lists.submitted?'done Todos' :'Todos'} 
           onClick={(e)=>{completed(index,e)}}
           >{lists.content}  
          </li>
          
)
      })} 
      
      </div>
    </div>
  );
}

export default App;
