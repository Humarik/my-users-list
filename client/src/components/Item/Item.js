import React, { useContext } from 'react';
import Context from '../../context.js';
import './item.css'
import Requests from '../../requests/requests.js'

const requests = new Requests();

function Item({user}) {
    const { setUsers, socket } = useContext(Context);

    const removeUser = async (e) => {
        const id = e.target.id;
        const response = await requests.postRequest(
            `/users/deleteUser/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            }
        );
        const data = await response.json();
        setUsers(data);
        socket.emit('removeUser', data);
    }
    return(
        <li title='удалить' onClick={removeUser} className='userItem' id={user._id}>{`Имя: ${user.name}  Возраст: ${user.age}`}</li>
    )
}

export default Item;