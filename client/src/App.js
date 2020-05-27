import React, { useEffect, useState } from 'react';
import Context from './context.js'
import './app.css'
import List from './List/List.js'
import Form from './Form/Form.js'
import openSocket from 'socket.io-client';

function App() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState({});
  // let socket;

  useEffect(() => {
    async function getResponse() {
      setSocket(openSocket('http://localhost:5000'));
      const response = await fetch('/users')
      const users = await response.json()
      setUsers(users);
    }
    getResponse();
  }, []);

  useEffect(() => {
    // console.log(socket)
    if(!socket.on) return
    // const socket = openSocket('http://localhost:5000/');
    socket.on('first', function (user) {
      setUsers([...users, user]);
      console.log(user);
    });
  }, [users])

  const openFrom = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Context.Provider
    value={{ users, setUsers, socket }}
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
