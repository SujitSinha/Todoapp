import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

function App() {
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const[dataCopy,setDataCopy]  = useState(data);
  const [search, setSearch] = useState(false);
  
  const handleChange = (e) => {
    e.preventDefault();
    setItem(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data,{content:item,edit:false}]);
    setItem("");
    setSearch(true);
    setDataCopy([...dataCopy,{content:item,edit:false}]);
  }
 
 const completed=(i,e)=>{
   let toDo = [...data];
   toDo[i].edit=false;
  toDo[i].content=(document.getElementById('text').value);
   setData(toDo);
 }
 const handleDelete=(index)=>{
  let toDo = [...data];
  toDo.splice(index,1);
  setData(toDo);
 }

const handleEdit=(i)=>{
  let toDo = [...data];
  toDo[i].edit=true;
   setData(toDo);
}

const searchHandler=(e)=>{
let toDo=[...dataCopy];
let filteredData=toDo.filter((item)=>
{return item.content.toLowerCase().includes(e.target.value.toLowerCase()); 
})
setData(filteredData);
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
     {search &&  <input onChange={searchHandler} placeholder="Search..."></input>}
      {data.map((lists, index) => {
        return ( 
          <div>  
         {lists.edit &&
         <div className="list">
         <textarea key={index}
         id="text" 
          className='Todos'
          >
            {lists.content}
            
         </textarea>
         <Button variant="contained" color="default" size="small" className="button-edit"  onClick={(e)=>completed(index,e)}>Save</Button>

         <Button variant="contained" color="secondary" size="small" className="button-delete" onClick={()=>handleDelete(index)}>Delete</Button>
</div>
}

         {!lists.edit && <div className="list">
          <li key={index} 
           className={lists.submitted?'Todos' :'Todos'} 
           onBlur={(e)=>{completed(index, e)}} 
           >
             {lists.content}
          </li>
          <Button variant="contained" color="default" size="small" className="button-edit"  onClick={()=>handleEdit(index)}>Edit</Button>

          <Button variant="contained" color="secondary" size="small" className="button-delete" onClick={()=>handleDelete(index)}>Delete</Button>
          </div>
         }
         
  
</div>         
)
      })} 
      
      </div>
    </div>
  );
}

export default App;
