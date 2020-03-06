import React from 'react';
import './App.css';
import firebase from '../firebase'
import {Button} from 'semantic-ui-react'
import NavBarContainer from './Containers/NavBarContainer'
function App() {
  const signOut = () => firebase.auth().signOut()
  return (
    <div className="app">
        <NavBarContainer/>
    </div>
  );
}

export default App;
