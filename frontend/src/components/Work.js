import React from 'react'
import Task from './Task';
import { url } from './constants'

export default function Work(){
    const [tasks, setTasks] = React.useState([]);
    const [textValue,setTextValue] = React.useState("");

    const  workServiceURL= `${url}/work-service`;

    async function onAdd(value){
        const options ={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title: value, completed: false})
        }
        const response = await fetch(`${workServiceURL}`,options).then(resp => resp.json()).then(data => data);
        setTasks(response);
        setTextValue("");
    }

    async function onUpdate(id,value){
        const options ={
            method: 'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({id,value})
        }
        const response = await fetch(`${workServiceURL}`,options).then(resp => resp.json()).then(data => data);
        setTasks(response);
    }

    async function onDelete(id,value){
        const options ={
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({id,value})
        }
        const response = await fetch(`${workServiceURL}`,options).then(resp => resp.json()).then(data => data);
        setTasks(response);
    }

    React.useEffect(() => {
        fetch(`${workServiceURL}`).then(response => response.json()).then(data => {
            setTasks(data)
        });
    },[])

    return (
        <div className="work">
            <h3>Work Task</h3>
            <input 
                type="text" 
                className="add-field"
                value={textValue}
                onChange={e => setTextValue(e.target.value)}
                onKeyDown={e => {if(e.key === "Enter"){onAdd(e.target.value)}}}
            >
            </input>
            {tasks.map(task => (
                <Task key={task._id} id={task._id} title={task.title} completed={task.completed} toggleComplete={onUpdate} deleteItem={onDelete} />
            ))}
        </div>
    )
}
