
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//components
import NavBar from './components/navbar';

//pages
import Home from './pages/Home';
import SignIn from './pages/SingIn';

const Router = () => {

    const path = window.location.pathname

    return ( 

        <BrowserRouter>

            <NavBar path={path}></NavBar>

            <Routes>

                <Route path="/" element={<Home/>}>

                </Route>

                <Route path='/signin' element={<SignIn path={path}/>}>

                </Route>

            </Routes>
        </BrowserRouter>


     );
}
 
export default Router;