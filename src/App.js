import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ModalCyberBugs from './components/Cyberbugs/ModalCyberBugs/ModalCyberBugs';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberBugs from './HOC/CyberbugsHOC/DrawerCyberBugs';
import SidebarCyberbugs from './components/Cyberbugs/SidebarCyberbugs';
import MenuCyberbugs from './components/Cyberbugs/MenuCyberbugs';
import IndexCyberBugs from './pages/CyberBugs/IndexCyberBugs/IndexCyberBugs';
import UserManagement from './pages/CyberBugs/UserManagement/UserManagement';
import SignupCyberBug from './pages/CyberBugs/SignupCyberBug/SignupCyberBug';

function App() {
  return (
    <>
      {/* <Modal /> */}
      <DrawerCyberBugs />
      <LoadingComponent />
      <ModalCyberBugs />
      <Routes>
        <Route path='/home' element={
          <>
            <LoginCyberBugs />
          </>
        } />
        <Route path='/' element={
          <>
            <LoginCyberBugs />
          </>
        } />
        <Route path='*' element={
          <>
            <LoginCyberBugs />
          </>
        } />
        <Route path='/logincyberbugs' element={
          <>
            <LoginCyberBugs />
          </>
        } />
        <Route path='/createproject' element={
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              <CreateProject />
            </div>
          </>
        } />
        <Route path='/projectmanagement' element={
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              <ProjectManagement />
            </div>
          </>
        } />
        <Route path='/signupcyberbugs' element={
          <>
            <SignupCyberBug />
          </>
        } />
        <Route path='/projectdetail/:projectId' element={
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              <IndexCyberBugs />
            </div>
          </>
        } />
        <Route path='/usermanagement' element={
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              <UserManagement />
            </div>
          </>
        } />
      </Routes>


    </>
  );
}

export default App;
