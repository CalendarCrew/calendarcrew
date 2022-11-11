import '../App.css';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import useToken from './useToken';


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }


    return (
    <div className="wrapper">
      <h1>Application</h1>
      <Dashboard />
    </div>
  );
}

export default App;
