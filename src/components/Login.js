import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const history = useHistory();

  function handleChange (e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit (e) {
    e.preventDefault();

    if (credentials.username === '' || credentials.password === '') {
      setError('Both username and password must be filled out!');
    } else {
      axios
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        // console.log(res.data.payload);
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/bubble-page');
      })
      .catch(err => {
        setError(err.response.data.error);
      })
    }
  };

  return (
      <div className='login-form'>
        <h1>Welcome to the Bubble App!</h1>

        <form onSubmit={handleSubmit}>
          <h2>Login:</h2>
          <input
          name='username'
          type='text'
          placeholder='Username'
          value={credentials.username}
          onChange={handleChange}/>

          <input
          name='password'
          type='password'
          placeholder='Password'
          value={credentials.password}
          onChange={handleChange}/>

          <button>Login</button>
          <div className='error'>{error}</div>
        </form>
      </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.