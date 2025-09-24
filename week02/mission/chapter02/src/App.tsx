import './App.css'
import { useState } from 'react'

type Task = {
  id: number
  text: string
}

export default function App() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([])
  const [doneTasks, setDoneTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState('')

  // 할 일 추가
  const addTodo = (text: string) => {
    setTodoTasks([...todoTasks, { id: Date.now(), text }])
    setInputValue('')
  }

  // 완료 처리
  const completeTask = (task: Task) => {
    setTodoTasks(todoTasks.filter((t) => t.id !== task.id))
    setDoneTasks([...doneTasks, task])
  }

  // 삭제 처리
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTodo(inputValue.trim())
    }
  }

  return (
    <div className='todo-container'>
      <h1 className='todo-container__header'>YONG TODO</h1>
      <form id='todo-form' className='todo-container__form' onSubmit={handleSubmit}>
        <input
          type='text'
          id='todo-input'
          className='todo-container__input'
          placeholder='할 일 입력'
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='todo-container__button'>
          할 일 추가
        </button>
      </form>
      <div className='render-container'>
        <div className='render-container__section'>
          <h2 className='render-container__title'>할 일</h2>
          <ul id='todo-list' className='render-container__list'>
            {todoTasks.map((task) => (
              <li key={task.id} className='render-container__item'>
                {task.text}
                <button
                  className='render-container__item-button'
                  style={{ backgroundColor: 'green' }}
                  onClick={() => completeTask(task)}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='render-container__section'>
          <h2 className='render-container__title'>완료</h2>
          <ul id='done-list' className='render-container__list'>
            {doneTasks.map((task) => (
              <li key={task.id} className='render-container__item'>
                {task.text}
                <button
                  className='render-container__item-button'
                  style={{ backgroundColor: 'red' }}
                  onClick={() => deleteTask(task)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
