import './App.css';
import React from 'react';
import './styles/Layout.scss'
import Nav from './components/navbar';
function App() {
  return (
    <div className="App">
      <Nav register="https://your-registration-link.com" />
    </div>
  );
}

export default App;
