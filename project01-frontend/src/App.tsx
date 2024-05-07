import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header/Header';
import { Welcome } from './components/Welcome/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Login/Register';
import { RegisterSucceed } from './components/HandlerResult/RegisterSucceed';
import { RegisterFail } from './components/HandlerResult/RegisterFail';
import { LoginFail } from './components/HandlerResult/LoginFail';
import { EmployeeReim } from './components/Reimbursement/Employee/EmployeeReim';
import { ManagerReim } from './components/Reimbursement/Manager/ManagerReim';
import { AllEmpReimbursements } from './components/Reimbursement/Employee/AllEmpReimbursements';
import { PendingEmpReimbursements } from './components/Reimbursement/Employee/PendingEmpReimbursements';
import { ApprovedEmpReimbursements } from './components/Reimbursement/Employee/ApprovedEmpReimbursements';
import { DeniedEmpReimbursements } from './components/Reimbursement/Employee/DeniedEmpReimbursements';
import { AddReimbursement } from './components/Reimbursement/Employee/AddReimbursement';
import { UpdateReimbursement } from './components/Reimbursement/Employee/UpdateReimbursement';
import { AddReimbSucceed } from './components/HandlerResult/AddReimbSucceed';
import { AddReimbFail } from './components/HandlerResult/AddReimbFail';
import { NotFoundPage } from './components/Welcome/NotFoundPage';
import { UpdateReimbSuccess } from './components/HandlerResult/UpdateReimbSucceed';
import { UpdateReimbFail } from './components/HandlerResult/UpdateReimbFail';
import { AllReimbursements } from './components/Reimbursement/Manager/AllReimbursements';
import { PendingReimbursements } from './components/Reimbursement/Manager/PendingReimbursements';
import { AllUsers } from './components/Reimbursement/Manager/AllUsers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <hr></hr>

        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/regsucceed" element={<RegisterSucceed />} />
          <Route path="/regfail" element={<RegisterFail />} />
          <Route path="/loginfail" element={<LoginFail />} />
          <Route path="/employeereimb" element={<EmployeeReim/>}>
            <Route index element={<AllEmpReimbursements/>} />
            <Route path="all" element={<AllEmpReimbursements/>} />
            <Route path="pending" element={<PendingEmpReimbursements/>} />
            <Route path="approved" element={<ApprovedEmpReimbursements/>} />
            <Route path="denied" element={<DeniedEmpReimbursements/>} />
            <Route path="add" element={<AddReimbursement/>} />
            <Route path="update/:reimbId" element={<UpdateReimbursement/>} />
            <Route path="addsuccess" element={<AddReimbSucceed/>} />
            <Route path="addfail" element={<AddReimbFail/>} />
            <Route path="updatesuccess" element={<UpdateReimbSuccess/>} />
            <Route path="updatefail" element={<UpdateReimbFail/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
          <Route path="/managerreimb" element={<ManagerReim/>}>
            <Route index element={<AllReimbursements/>} />
            <Route path="all" element={<AllReimbursements/>} />
            <Route path="pending" element={<PendingReimbursements/>} />
            <Route path="allusers" element={<AllUsers/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
