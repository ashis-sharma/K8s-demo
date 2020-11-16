import React from 'react'
import Task from './Task';

export default function Personal() {
    const personalServiceURL= "http://personal-service:5000";
    const [tasks, setTasks] = React.useState([]);
    const [textValue,setTextValue] = React.useState("");

    async function onAdd(value){
        const options = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title: value, completed: false})
        }
        const response = await fetch(`${personalServiceURL}`,options).then(resp => resp.json()).then(data => data.items);
        setTasks(response);
        setTextValue("");
    }

    async function onUpdate(id,value){
        const options ={
            method: 'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({id,value})
        }
        const response = await fetch(`${personalServiceURL}`,options).then(resp => resp.json()).then(data => data.items);
        setTasks(response);
    }

    async function onDelete(id,value){
        const options ={
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({id,value})
        }
        const response = await fetch(`${personalServiceURL}`,options).then(resp => resp.json()).then(data => data.items);
        setTasks(response);
    }

    React.useEffect(() => {
        fetch(`${personalServiceURL}`).then(response => response.json()).then(data => {
            setTasks(data.items)
        });
    },[])

    return (
        <div className="personal">
            <h3>Personal Task</h3>
            <input 
                type="text" 
                className="add-field"
                value={textValue} 
                onChange={e => setTextValue(e.target.value)}
                onKeyDown={e => {if(e.key === "Enter"){ onAdd(e.target.value) }}}
            >
            </input>
            {tasks.map(task => (
                <Task key={task._id} id={task._id} title={task.title} completed={task.completed} toggleComplete={onUpdate} deleteItem={onDelete} />
            ))}
        </div>
    )
}
