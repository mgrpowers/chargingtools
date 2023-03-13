import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch("http://localhost:8000/api/v1")
        .then(res => res.json())
        .then(res => setData(res));
  },[])

  console.log(data)

  return (
    <div className="App">
      {data.what}
    </div>
  );
}

export default App;
