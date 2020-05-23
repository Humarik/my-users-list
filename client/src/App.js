import React, { useEffect, useState } from 'react';
import Context from './context.js'
import './app.css'
import List from './List/List.js'
import Form from './Form/Form.js'

function App() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getResponse() {
      const response = await fetch('/users')
      const users = await response.json()
      setUsers(users);
    }
    getResponse();
  }, []);

  const openFrom = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Context.Provider
    value={{ users, setUsers }}
    >
      <div className='main'>
        <h2>Список пользователей</h2>
        {isOpen
          ? <button className='btnOpenForm' onClick={openFrom}> Закрыть форму </button>
          : <button className='btnOpenForm' onClick={openFrom}> Открыть форму </button>
        }
        {isOpen && <Form/>}
        <List users={users}></List>
      </div>
    </Context.Provider>
  );
}

export default App;
