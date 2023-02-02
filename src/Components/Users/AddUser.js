import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper"

const AddUser = props => {
    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = event =>{
        event.preventDefault();
        if(enteredUserName.trim().length ===0 || enteredAge.trim().length === 0){
            setError({
                title:'Invalid input',
                message:'Please enter valid name and age(non-empty values)'
            });
            return;
        }
        if(+enteredAge < 1){
            setError({
                title:'Invalid age',
                message:'Please enter valid age ( > 0).'
            });
            return;
        }
        props.onAddUsers(enteredUserName, enteredAge);
        setEnteredUserName('');
        setEnteredAge('');
    }
    const changeUserNameHandler = (event) => {
        setEnteredUserName(event.target.value);
    }
    const changeAgeHandler = (event) => {
        setEnteredAge(event.target.value);
    }
    const errorHandler = ()=>{
        setError(null);
    }
    return (<Wrapper>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
    <Card className={classes.input}>   
    <form onSubmit={addUserHandler}>
        <label htmlFor="username">User Name:</label>
        <input id="username" type="text" value={enteredUserName} onChange={changeUserNameHandler}/>
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" value={enteredAge} onChange={changeAgeHandler}/>
        <Button type="submit">Add User</Button>
    </form>
    </Card>
    </Wrapper>
 )
}

export default AddUser;