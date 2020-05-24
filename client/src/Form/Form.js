import React,{useContext} from 'react';
import Context from '../context.js'

function Form() {
    const { users, setUsers } = useContext(Context);

    const addUser = async (e) => {
        e.preventDefault();
        const form = document.querySelector('.form');

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

        form.elements.name.value = '';
        form.elements.age.value = '';
    }

    return(
        <form className='form'>
            <fieldset>
                <legend>Добавить пользователя</legend>
                <label>Имя</label>
                <input type="text" name="name" />
                <label>Возраст</label>
                <input type="number" name="age" />
                <input type="submit" onClick={addUser} value="Отправить" />
            </fieldset>
        </form>
    )
}

export default Form;