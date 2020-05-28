import React, { useEffect, useState } from 'react';
import Requests from '../../requests/requests.js'
import Context from '../../context.js'
import './app.css'
import List from '../List/List.js'
import Form from '../Form/Form.js'

const requests = new Requests();

function App() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState({});

  useEffect(() => {
    setSocket(requests.connectionSocket('https://my-users-list.herokuapp.com'));
    // setSocket(requests.connectionSocket('http://localhost:5000'));
    async function fetchData() {
      const response = await requests.getRequest('/users');
      setUsers(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if(!socket.on) return
    socket.on('createUser', user => setUsers([...users, user]));
    socket.on('removeUser', users => setUsers(users));
  }, [users]);

  const openFrom = () => setIsOpen(!isOpen);

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
