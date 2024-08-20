import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Start from './components/Start';
import Test from './components/Test';
import CreateTest from './components/CreateTest';
import AdminPage from './components/AdminPage';
import { DataProvider } from './DataProvider/Context';

function App() {
    return (
        <DataProvider> 
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/start" element={<Start />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/create-test" element={<CreateTest />} />
                        <Route path="/admin-page" element={<AdminPage />} />
                    </Routes>
                </div>
            </Router>
        </DataProvider>
    );
}

export default App;
