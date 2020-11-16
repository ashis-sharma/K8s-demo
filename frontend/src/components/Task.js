import React from 'react'

export default function Task(props) {
    return (
        <div className="task">
            <input 
                type="checkbox"
                checked={props.completed} 
                className="checkbox" 
                onChange={() => props.toggleComplete(props.id,!props.completed) } 
            />
            <p style={{textDecoration: props.completed ? 'line-through' : 'none'}}>{props.title}</p>
            <button 
                className="delete" 
                onClick={() => props.deleteItem(props.id,!props.completed)}>
            x
            </button>
        </div>
    )
}
