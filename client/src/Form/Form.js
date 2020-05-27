import React,{useContext} from 'react';
import './form.css'
import Context from '../context.js'
// import openSocket from 'socket.io-client';

function Form() {
    const { users, setUsers, socket } = useContext(Context);

    const addUser = async (e) => {
        e.preventDefault();
        const form = document.querySelector('.form');

        if(!form.elements.name.value || !form.elements.age.value) return alert ('Ты ахуел?');

        // const socket = openSocket('http://localhost:5000');

        const response = await fetch('/users/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.elements.name.value,
                age: form.elements.age.value
            })
        });

        const user = await response.json();
        setUsers([...users, user]);

        socket.emit('first', user);

        form.elements.name.value = '';
        form.elements.age.value = '';
    }

    return(
        <form className='form'>
            <fieldset className='form'>
                <legend>Добавить пользователя</legend>
                <label>Имя</label>
                <input type="text" name="name" placeholder='Введите имя' maxLength='15'/>
                <label>Возраст</label>
                <input type="number" name="age" placeholder='Введите возраст' max='120'/>
                <input className='sbt' type="submit" onClick={addUser} onKeyDown={(event) => {
                    if(event.key === 'Enter') addUser();
                }} value="Отправить" />
            </fieldset>
        </form>
    )
}

export default Form;