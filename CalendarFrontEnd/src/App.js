import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Calendar from "./Calendar"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"

function setToken(userToken) {
    // sessionStorage.setItem('token', JSON.stringify(userToken));
    window.sessionStorage.setItem("token","b");
}
  
function getToken() {
    const tokenString = sessionStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    // console.log(userToken);
    // return userToken?.token
}

function App() {

    const token = getToken();

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