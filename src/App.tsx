import './App.css';
import { FC } from 'react'
import User from './component/user/User';
import Userlist from './component/users/Userlist';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
