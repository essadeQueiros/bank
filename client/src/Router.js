import { useState, useEffect } from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Axios from 'axios';

//components
import NavBar from './components/navbar';

//pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Account from './pages/Account'
import DashBoardMenu from './components/dashboard/menu';

const Router = () => {

    const path = window.location.pathname

    const [logged, setLogged] = useState(false)

    const [user, setUser] = useState({})
    
    const userStorage = window.sessionStorage.getItem('user')

    const sessionId = window.localStorage.getItem('sessionId')
    const userId = window.localStorage.getItem('userId')

    useEffect(() => {
        if(sessionId && userId) {
            console.log('have session stored')
            Axios.post('http://localhost:3001/storesid', {
                sessionId: sessionId,
                userId: userId,
                gettingUser: true
            }).then((res) => {
                storeSession(res.data.user)
                setLogged(true)
                setUser(res.data.user)
            })
        }
        if(!userStorage && path !== '/signin' && !sessionId && !userId){
            setLogged(false)
            window.location.replace('/signin')
        }
    }, [])

    const storeSession = (value) => {
        window.sessionStorage.setItem('user', JSON.stringify(value))
        window.sessionStorage.setItem('logged', true)
    }

    const generateSessionId = (value) => {
        const date = new Date()
        const time = date.getTime()
        let max = value.length * time
        let min = 1
        let sessionId = ''
        let newSessionId = ''
        let letter = value.length
        for(min; min < max; min++){
            letter--
            sessionId =+ (time * max) / (min * time)
            newSessionId += value[letter] + time
            max /= min
        }
        return newSessionId.slice(0, 50)
    } 
    
    const storeSessionId= (value, id, newSession) => {
        const newSID = generateSessionId(value)
        const oldSID = window.localStorage.getItem('sessionId')
        console.log(newSID, oldSID)
        window.localStorage.setItem('sessionId', newSID)
        window.localStorage.setItem('userId', id)
        Axios.post('http://localhost:3001/storesid', {
            newSID: newSID,
            oldSID: oldSID,
            id: id,
            newSession: newSession
        }).then(res => {
            console.log(res)
        })
    }

    return ( 

        <BrowserRouter>

            <NavBar path={path} logged={logged} user={user} sessionId={sessionId}></NavBar>

            <Routes>

                <Route path="/" element={<Home />}>

                </Route>

                <Route path='/signin' element={<SignIn user={user} storeSession={storeSession} storeSessionId={storeSessionId}/>}>

                </Route>

                <Route path='/account/:id/:sessionid/dashboard' 
                element={
                <Account user={user}>
                    <DashBoardMenu></DashBoardMenu>
                </Account>
                }>

                </Route>

            </Routes>

        </BrowserRouter>


     );
}
 
export default Router;