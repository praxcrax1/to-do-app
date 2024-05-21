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
    <div className='app-container'>
      <Menu onChangeView={toggleView}/>
      <Notes isListView={isListView}/>
    </div>
  );
}

export default App;
