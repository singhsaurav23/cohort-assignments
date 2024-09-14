import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil'
import { TodoState, filterState, filtersState } from './atom.js';
import { useState } from 'react'
import { filterSelector } from './selector.js'

function App() {
  
    return (
     
            <RecoilRoot>
            <Form />
            <Todo />
            <Filtering />
            <Show/>
        </RecoilRoot>

  )
}

const Form = () => {
    const setTodo = useSetRecoilState(TodoState);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    const handleAddTodo = () => {
        setTodo((prevTodo) => [
            ...prevTodo,
            { title, description }
        ]);
    };

    return (
        <div>
            <input type="text" placeholder="Title" name="title" value={title} onChange={handleInputChange} /> <br />
            <input type="text" placeholder="Description" name="description" value={description} onChange={handleInputChange} /> <br />
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};

const Todo = () => {
    const todos = useRecoilValue(TodoState);
   // console.log(todos);
    return (
        <div>
            {todos.map((todo, index) => {
                return <div key={index}>
                    <ul>
                        <li>{todo.title}</li>
                        <li>{todo.description}</li>
                    </ul>
                </div>
            }
            )}
        </div>
    );
};

const Filtering = () => {
    const setFilter = useSetRecoilState(filterState);
    const setFilters = useSetRecoilState(filtersState);
    const filtersSelector = useRecoilValue(filterSelector);
    const handle = () => {
        setFilters(filtersSelector)
    }
    return <div>
        <input type='text' placeholder='filter' onChange={(e) => {
            setFilter(e.target.value);
        } }></input>
        <button onClick={handle }>SetFilter</button>
    </div>
}

const Show = () => {
    const filters = useRecoilValue(filtersState);
    // console.log(todos);
    return (
        <div>
            {filters.map((todo, index) => {
                return <div key={index}>
                    <ul>
                        <li>{todo.title}</li>
                        <li>{todo.description}</li>
                    </ul>
                </div>
            }
            )}
        </div>
    );
}
 
export default App;
