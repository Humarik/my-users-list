import React, { useContext } from 'react';
import Context from '../context.js';

import './item.css'

function Item({user}) {
    const { setUsers } = useContext(Context);

    const deleteUser = async (e) => {
        const id = e.target.id
        const response = await fetch(`/users/deleteUser/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        const data = await response.json();
        setUsers(data);
    }
    return(
        <li title='удалить' onClick={deleteUser} className='userItem' id={user.id}>{`Имя: ${user.name}  Возраст: ${user.age}`}</li>
    )
}

export default Item;