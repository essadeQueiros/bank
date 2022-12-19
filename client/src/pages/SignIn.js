import { useEffect, useState } from "react";

import Axios from 'axios'
import axios from "axios";

const SignIn = (props) => {

    useEffect(() => {
        if(window.sessionStorage.getItem('user')){
            window.location.replace('/account/' + props.user.id)
        }
    }, [])

    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(true)

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [emailRegistered, setEmailRegistered] = useState(false)

    const [userCreated, setUserCreated] = useState(false)

    const [signing, setSigning] = useState(false)

    const [incorrectData, setIncorrectData] = useState(false)

    const resetInputs = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    const checkEmail = (value) => {
        if(!value.includes(' ')){
            setEmail(value)
        }
    }
    
    const verifyEmail = () => {
        if(email.includes('@') && email.includes('.') && email.length > 5){
            return true
        }
        return false
    }

    useEffect(() => {
        if(openSignUp){
            verifyEmail()
        }
    }, [email])

    const checkPassword = (value) => {
        if(!value.includes(' ') && value.length <= 16){
            setPassword(value)
        }
    }

    const verifyPassword = () => {
        if(password.length >= 8 && password.length <= 16){
            if(/(?=.*[A-Z])\d/.test(password)){
                return true
            }
        }
        return false
    }
    
    const checkInputs = () => {
        if(firstName.length > 0 && lastName.length > 0 && verifyEmail() && verifyPassword()){
            return true
        }
        return false
    }

    const signUp = () => {
        console.log('will check')
        if(checkInputs()){
            console.log('check')
            setSigning(true)

            Axios.post('http://localhost:3001/signup', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }).then((res) => {
                console.log(res)
                if(res.data.userExists){
                    setEmailRegistered(true)
                }
                if(res.data.userCreated){
                    setEmailRegistered(false)
                    setInterval(() => {
                        setUserCreated(true)
                        setInterval(() => {
                            window.location.replace('/signin')
                        }, 3000)
                    }, 4000)
                }
            })

        }
    }

    

    const signIn = () => {
        setSigning(true)
        if(email.length > 0 && password.length > 0){
            Axios.post('http://localhost:3001/signin', {
                email: email,
                password: password
            }).then((res) => {
                if(res.data.userExists){
                    props.storeSession(res.data.user)
                    setIncorrectData(false)
                    props.storeSessionId(res.data.user.email.split('@')[0], res.data.user.id, true)
                    setInterval(() => {
                        setSigning(false)
                        window.location.replace('/home')
                    }, 5000)
                }
                else{
                    setIncorrectData(true)
                    setSigning(false)
                }
            })
        }
    }

    


    return ( 
        <div className="SignIn w-screen h-screen bg-gray-800 pt-60">
            <div className="transition-all bg-gray-900 py-2 px-2 ease-in-out duration-300 w-5/6 mx-auto 2xl:w-1/4 xl:w-1/3 lg:w-2/5 md:w-1/2 flex flex-col items-center justify-center border-2 border-black">
                <div className='w-full py-5 border-white border-2'>
                    <div className="flex flex-col">
                        {openSignIn ? <span className="text-3xl mb-1 text-gray-300">Sign In</span> : <span className="text-3xl mb-1 text-gray-300">Sign Up</span>}
                        {openSignIn && <span className="text-gray-400 text-md">Enter your email and password!</span>}
                    </div>
                    <div className="w-full h-full px-2 py-4 flex flex-col"> 
                        {openSignUp && <input onChange={(e) => {setFirstName(e.target.value); checkInputs()}} value={firstName} className="mt-5 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="First Name"></input>}
                        {openSignUp && <input onChange={(e) => {setLastName(e.target.value); checkInputs()}} value={lastName} className="my-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Last Name"></input>}
                        {incorrectData && <span className="text-red-500 animate-pulse">Email or password incorrect!</span>}
                        <input onChange={(e) => {checkEmail(e.target.value); checkInputs()}} value={email} className="my-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Email"></input>
                        {emailRegistered && <span className="text-gray-200">This email has already been registered</span>}
                        <input onChange={(e) => {checkInputs(); checkPassword(e.target.value)}} value={password} className="transition ease-in-out duration-200 mt-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Password"></input>
                        {openSignUp && <div className="flex flex-col mt-2 w-full">
                                            <span className="w-full text-md text-left text-gray-300">Password Requirements:</span>
                                            <ul className="w-3/4  mt-2 ml-5 text-left">
                                                <li className=" list-disc text-gray-400 text-sm">Min. 8 characters & Max. 16 characters</li>
                                                <li className="list-disc text-gray-400 text-sm">At least 1 number (e.g., "1")</li>
                                                <li className="list-disc text-gray-400 text-sm">At least 1 upper case letter (e.g., "A")</li>
                                            </ul>
                            </div>}
                        {openSignIn && <span className="mt-3 text-md text-gray-400">Forgot password?</span>}
                    </div>
                    {openSignUp && <button onClick={() => {signUp()}} className="mt-4 w-40 h-10 mx-auto items-center justify-center flex col rounded text-lg text-white border-2 border-white bg-blue-600 !disabled:hover:bg-transparent !disabled:hover:border-2 !disabled:hover:border-blue-600 disabled:opacity-50">
                            {!signing && <span>Sign Up</span>}
                            {signing && <div className="w-5 h-5 animate-spin rounded-full mx-auto border-y-2  border-white"></div>}
                        </button>}
                    {openSignIn && <button onClick={() => {signIn()}} className="mt-4 w-40 h-10 mx-auto items-center justify-center flex col rounded text-lg text-white border-2 border-white bg-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">
                            {!signing && <span>Sign In</span>}
                            {signing && <div className="w-5 h-5 animate-spin rounded-full mx-auto border-y-2  border-white"></div>}
                        </button>}
                    {openSignIn && <div className="mt-5">
                        <span className="text-gray-200">Dont have an account yet? </span>
                        <span onClick={() => {setOpenSignUp(true); setOpenSignIn(false); resetInputs()}} className={"font-bold text-blue-600 cursor-pointer"}> Sign Up</span>
                    </div>}
                    {userCreated && <span className="text-gray-200 mt-4 text-base">Account created with success, you'll be redirect...</span>}
                    {openSignUp && <div className="mt-3">
                        <span className="text-gray-200">Already have an account?</span>
                        <span onClick={() => {setOpenSignUp(false); setOpenSignIn(true); resetInputs()}} className="font-bold text-blue-600 cursor-pointer"> Sign In</span>
                    </div>}
                </div>
            </div>
        </div>
     );
}
 
export default SignIn;