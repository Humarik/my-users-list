import React, {useContext} from 'react'
import Context from '../context.js'
import Item from '../Item/Item.js'
import './list.css'

function List () {
    const { users } = useContext(Context);
    return (
        <ul className='userList'>
            {users.map(user => <Item key={user.id} user={user}></Item>)}
        </ul>
    )
}

export default List;