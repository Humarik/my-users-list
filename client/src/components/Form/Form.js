import React,{useContext} from 'react';
import './form.css'
import Context from '../../context.js'
import Requests from '../../requests/requests.js'

const requests = new Requests();

function Form() {
    const { users, setUsers, socket } = useContext(Context);

    const addUser = async (e) => {
        e.preventDefault();
        const form = document.querySelector('.form');
        let name = form.elements.name,
        age = form.elements.age;

        if(!name.value || !age.value) return alert ('Ты ахуел?');

        const response = await requests.postRequest(
            '/users/createUser',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name.value, age: age.value})
            }
        );

        const user = await response.json();
        setUsers([...users, user]);
        socket.emit('createUser', user);

        name.value = '';
        age.value = '';
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