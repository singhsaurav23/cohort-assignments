import React, { useState } from 'react';

function App() {
    // Define state variables
    const [todoState, setTodoState] = useState([]);
    const [globalId, setGlobalId] = useState(1);

    // Function to mark todo as done
    const markAsDone = (id) => {
        setTodoState(prevState => {
            const updatedTodos = prevState.map(todo => {
                if (todo.id === id) {
                    return { ...todo, status: 'Done' };
                }
                return todo;
            });
            return updatedTodos;
        });
    };

    // Function to add todo
    const addTodo = () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const newTodo = {
            title: title,
            description: description,
            id: globalId,
            status: 'Pending'
        };
        setTodoState(prevState => [...prevState, newTodo]);
        setGlobalId(prevId => prevId + 1); // Increment globalId for the next todo
    };

    // Function to remove todo
    const removeTodo = (id) => {
        setTodoState(prevState => prevState.filter(todo => todo.id !== id));
    };

    // Function to update todo
    const updateTodo = (id, updatedTodo) => {
        setTodoState(prevState => {
            const updatedTodos = prevState.map(todo => {
                if (todo.id === id) {
                    return { ...todo, ...updatedTodo };
                }
                return todo;
            });
            return updatedTodos;
        });
    };

    return (
        <div>
            <input type="text" id="title" placeholder="Todo title" /><br /><br />
            <input type="text" id="description" placeholder="Todo description" /><br /><br />
            <button onClick={addTodo}>Add todo</button><br /><br />

            <div id="todos">
                {todoState.map(todo => (
                    <div key={todo.id}>
                        <div>{todo.title}</div>
                        <div>{todo.description}</div>
                        <div>{todo.status}</div>
                        <button onClick={() => markAsDone(todo.id)}>Mark as Done</button>
                        <button onClick={() => removeTodo(todo.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
