import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import UserPage from "./UserPage";

const App = () => {
  return (
    <Router>
      <Main />
      <UserPage/>
      {/* <Routes>
        <Route path="/:userId" component={UserPage } />
      </Routes> */}
    </Router>
  );
};

export default App;
