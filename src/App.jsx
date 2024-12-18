import './App.css'
import Login from './components/login'
import Register from './components/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './components/user_add';
import AddCompany from './components/company_add';
import CompanyDetail from './components/company_detail';
import UserDetail from './components/user_detail';
import UserProfile from './components/user_profile';
import Home from './components/home';
import Companies from './components/companies';
import Modals from './components/modal';
import ModalPopUp from './components/modal_popup';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add_user" element={<AddUser />} />
        <Route path="/add_company" element={<AddCompany />} />
        <Route path="/companies_detail" element={<CompanyDetail />} />
        <Route path="/user_detail" element={<UserDetail />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/modal" element={<Modals/>} />
        <Route path="/modalpopup" element={<ModalPopUp/>} />

      </Routes>
    </Router>
  )
}

export default App
