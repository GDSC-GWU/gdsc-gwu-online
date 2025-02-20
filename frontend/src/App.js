import './App.css';
import React from 'react';
import './styles/Layout.scss'
import Nav from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Nav register="https://your-registration-link.com" />
      <Footer />
    </div>
  );
}

export default App;
