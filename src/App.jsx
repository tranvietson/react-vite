import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import './components/todo/todo.css';
import reactLogo from './assets/react.svg';
import { useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';


const App = () => {

  const [todoList, setTodoList] = useState([

  ])

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    };
    //todoList.push(newTodo); setTodoList(todoList) shouldn't repair value directly in react
    setTodoList([...todoList, newTodo]);
  }

  const deleteTodo = (id) => {
    const newTodoList = todoList.filter(item => item.id !== id);
    setTodoList(newTodoList);
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  return (
    <>
      <Header />
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew addNewTodo={addNewTodo} />

        {/* {(todoList.length === 0) &&
        <div className='todo-image'>
          <img src={reactLogo} className='logo' />
        </div>
      }

      {
        todoList.length > 0 &&
        <TodoData todoList={todoList} />
      } */}
        {
          todoList.lengt > 0 ?
            <TodoData
              todoList={todoList}
              deleteTodo={deleteTodo}
            />
            :
            <div className='todo-image'>
              <img src={reactLogo} className='logo' />
            </div>
        }
      </div>
      <Footer />
    </>

  )
}

export default App
