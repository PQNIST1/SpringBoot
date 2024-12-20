import './App.css'
import Login from './components/login'
import Register from './components/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Home />} />
          <Route path="/companies" element={<Home />} />
          <Route path="/profile" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
