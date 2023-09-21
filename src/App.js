import React, { Component } from 'react';
import UserForm from './components/UserForm';
class App extends Component {
  render() {
    return (
      <div className='d-flex min-vh-100 justify-content-center align-items-center'>
        <UserForm />
      </div>
    )
  }
}

export default App;