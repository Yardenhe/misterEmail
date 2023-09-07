import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';

import { Home } from './pages/Home'
import { About } from './pages/About';

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { AboutVision } from './cmps/AboutVision';
import { AboutTeam } from './cmps/AboutTeam'
import { RobotIndex } from './pages/RobotIndex';
import { RobotDetails } from './pages/RobotDetails';


export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<AboutTeam />} />
                            <Route path="/about/vision" element={<AboutVision />} />
                        </Route>

                        <Route path="/robot" element={<RobotIndex />} />
                        <Route path="/robot/:robotId" element={<RobotDetails />} />
                    </Routes>
                </main>

                <AppFooter />
            </section>
        </Router>


    )
}
