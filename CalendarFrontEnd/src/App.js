import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Calendar from "./Calendar"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import useToken from './components/useToken';


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    )
  }

export default App;  