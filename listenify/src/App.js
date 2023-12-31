import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Stats from './components/Stats'
import Explore from './components/Explore'

function App() {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="/activity">
                        <Route index element={<Stats />} />
                        <Route path="/activity/explore" element={<Explore />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;