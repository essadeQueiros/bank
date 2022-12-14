import { useEffect, useState } from "react";

const SignIn = (props) => {

    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(true)

    useEffect(() => {

        console.log(openSignIn, openSignUp)

    }, [openSignIn, openSignUp])

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordWarn, setPasswordWarn] = useState(false)

    const checkPassword = (value) => {
        if(value !== password){
            setPasswordWarn(true)
        }
        else{
            setPasswordWarn(false)
        }
    }
    
    const resetInputs = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setPasswordWarn(false)
    }

    return ( 
        <div className="SignIn w-screen h-screen bg-gray-800 pt-60">
            <div className="transition-all bg-gray-900 py-2 px-2 ease-in-out duration-300 w-5/6 mx-auto xl:w-1/3 lg:w-2/5 md:w-3/5 flex flex-col items-center justify-center border-2 border-black">
                <div className='w-full py-5 border-white border-2'>
                    <div className="flex flex-col">
                        {openSignIn ? <span className="text-3xl mb-1 text-gray-300">Sign In</span> : <span className="text-3xl mb-1 text-gray-300">Sign Up</span>}
                        {openSignIn && <span className="text-gray-400 text-md">Enter your email and password!</span>}
                    </div>
                    <div className="w-full h-full px-2 py-4 flex flex-col"> 
                        {openSignUp && <input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="mt-5 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="First Name"></input>}
                        {openSignUp && <input onChange={(e) => setLastName(e.target.value)} value={lastName} className="my-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Last Name"></input>}
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="my-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Email"></input>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="transition ease-in-out duration-200 mt-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Password"></input>
                        {openSignUp && <input onChange={(e) => checkPassword(e.target.value)} className="transition ease-in-out duration-200 mt-5 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Confirm Password"></input>}
                        {passwordWarn && <span className="mt-3 text-md text-gray-400">Passwords doesn't match</span>}
                        {openSignIn && <span className="mt-3 text-md text-gray-400">Forgot password?</span>}
                    </div>
                    {openSignUp && <button className="mt-4 w-40 h-10 rounded text-lg text-white border-2 border-white bg-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">Sing Up</button>}
                    {openSignIn && <button className="mt-4 w-40 h-10 rounded text-lg text-white border-2 border-white bg-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">Sing In</button>}
                    {openSignIn && <div className="mt-5">
                        <span className="text-gray-200">Dont have an account yet? </span>
                        <span onClick={() => {setOpenSignUp(true); setOpenSignIn(false); resetInputs()}} className="font-bold text-blue-600 cursor-pointer">Sing Up</span>
                    </div>}
                    {openSignUp && <div className="mt-5">
                        <span className="text-gray-200">Already have an account?</span>
                        <span onClick={() => {setOpenSignUp(false); setOpenSignIn(true); resetInputs()}} className="font-bold text-blue-600 cursor-pointer"> Sing In</span>
                    </div>}
                </div>
            </div>
        </div>
     );
}
 
export default SignIn;