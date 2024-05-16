import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Register from './Register';
import Header from './Header';
import Footer from './Footer';
import Login from './Login'; // Corrected import statement with capital 'L'
import UserList from './UserList';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route without header and footer */}
        <Route path="/welcome" element={<Welcome />} />

        {/* Route with header and footer */}
        <Route path="/register" element={<>
          <Header />
          <Register />
          <Footer />
        </>} />

        {/* Route with header and footer */}
        <Route path="/userlist" element={<>
          <Header />
          <UserList />
          <Footer />
        </>} />

        

        

        {/* Route for login page */}
        <Route path="/login" element={<>
          <Header />
          <Login /> {/* Render the Login component */}
          <Footer />
        </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


