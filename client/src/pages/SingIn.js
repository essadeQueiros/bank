import { useEffect, useState } from "react";

const SignIn = (props) => {

    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(true)

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordWarn, setPasswordWarn] = useState(false)

    const [buttonDisabled, setButtonDisabled] = useState(true)

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

    const checkInputs = () => {
        console.log('Checking')
    }

    const checkEmail = () => {
        console.log(email)
    }

    useEffect(() => {
        if(openSignUp){
            checkEmail()
        }
    }, [email])

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
                        <input onChange={(e) => {setEmail(e.target.value); checkInputs()}} value={email} className="my-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Email"></input>
                        <input onChange={(e) => {setPassword(e.target.value); checkInputs()}} value={password} className="transition ease-in-out duration-200 mt-4 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Password"></input>
                        {openSignUp && <div className="flex flex-col mt-2 w-full">
                                            <span className="w-full text-md text-left text-gray-300">Password Requirements:</span>
                                            <ul className="w-3/4  mt-2 ml-5 text-left">
                                                <li className=" list-disc text-gray-400 text-sm">Min. 8 characters & Max. 16 characters</li>
                                                <li className="list-disc text-gray-400 text-sm">At least 1 number (e.g., "1")</li>
                                                <li className="list-disc text-gray-400 text-sm">At least 1 upper case letter (e.g., "A")</li>
                                            </ul>
                            </div>}
                        {openSignUp && <input onChange={(e) => {checkPassword(e.target.value)}} className="transition ease-in-out duration-200 mt-5 py-1 px-2 text-white border-2 border-white rounded-lg bg-transparent outline-none" placeholder="Confirm Password"></input>}
                        {passwordWarn && <span className="mt-3 text-md text-gray-400">Passwords doesn't match</span>}
                        
                        {openSignIn && <span className="mt-3 text-md text-gray-400">Forgot password?</span>}
                    </div>
                    {openSignUp && <button onClick={() => {console.log('signup')}} className="mt-4 w-40 h-10 rounded text-lg text-white border-2 border-white bg-blue-600 !disabled:hover:bg-transparent !disabled:hover:border-2 !disabled:hover:border-blue-600 disabled:opacity-50">Sing Up</button>}
                    {openSignIn && <button className="mt-4 w-40 h-10 rounded text-lg text-white border-2 border-white bg-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">Sing In</button>}
                    {openSignIn && <div className="mt-5">
                        <span className="text-gray-200">Dont have an account yet? </span>
                        <span onClick={() => {setOpenSignUp(true); setOpenSignIn(false); resetInputs()}} className={"font-bold text-blue-600 cursor-pointer"}>Sing Up</span>
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