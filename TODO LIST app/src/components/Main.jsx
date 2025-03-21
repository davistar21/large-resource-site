import { useState } from "react"

export default function Main () {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setTodoList([...todoList, input])
      setInput('');
    }
    
  }
  const TodoList = () => {
    return (
      <div>
        {todoList.length > 0 && 
          <ul className="todo-list">
            {todoList.map((todo, index) => {
              return (
                <li key={index}>{todo}</li>
              )
            })}
          </ul>}
      </div>
    )
  }
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="add task..." value={input} onChange={(e) => {setInput(e.target.value)}}/>
        <button type="submit">Add +</button>
      </form>
      < TodoList />
      {todoList.length > 0 && <button className="clear">Clear All</button>}
    </main>
  )
}