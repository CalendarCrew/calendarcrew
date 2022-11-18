import '../App.css';
import Dashboard from './Calendar';
import Login from './Login';
import useToken from './useToken';


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div className="wrapper">
      <Dashboard />
    </div>
  );
}

export default App;
