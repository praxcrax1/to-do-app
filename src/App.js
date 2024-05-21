import Notes from './components/Notes/index.jsx';
import Menu from './components/Menu/index.jsx';
import './App.css';
import { useState } from 'react';

function App() {

  const [isListView, setIsListView] = useState(false);

  const toggleView = () => {
    setIsListView(!isListView);
  };

  return (
    <div className="app-container">
      <Menu onChangeView={toggleView} />
      <div className="note-container">
        <h1>Notes App</h1>
        <Notes isListView={isListView} />
      </div>
    </div>
  );
}

export default App;
