import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const NavBar = (props) => {

    const [logged, setLogged] = useState(true)

    useEffect(() => {

        if(sessionStorage.getItem("logged") === true){
            setLogged(true);
        }
        else{
            setLogged(false);
        }

    }, [])


    return ( 
        <nav className="NavBar fixed border-b-2 border-black bg-gray-700 w-full shadow-lg shadow-gray-500/100 h-auto">
            <div className="container mx-auto flex justify-center items-center p-4">
                <div className='logo w-1/3 text-2xl'>Bank</div>  
                <div className="flex justify-center items-center w-1/3">
                    <ul className="flex w-full justify-around items-center">
                        <li className="w-full h-full flex items-center justify-center">
                            <Link to='/' className="group w-2/3 h-full relative flex justify-center align-center px-1 py-1 transition-all before:ease-out before:rounded-2xl before:absolute before:top-0 before:w-0 before:h-1 hover:before:w-full before:left-1/5 before:bg-green-900 before:duration-300 after:rounded after:absolute after:top-0 after:invisible hover:after:visible after:h-1 after:w-full after:duration-500 after:delay-200 hover:after:h-full before:left-1/5 after:bg-green-900">
                                <p className="text-white duration-500 delay-150 text-center text-lg z-20 ">Home</p>
                            </Link>
                        </li>                        
                        <li className="w-full h-full flex items-center justify-center">
                            <Link to='/cards' className="group w-2/3 h-full relative flex justify-center align-center px-1 py-1 transition-all before:ease-out before:rounded-2xl before:absolute before:top-0 before:w-0 before:h-1 hover:before:w-full before:left-1/5 before:bg-green-900 before:duration-300 after:rounded after:absolute after:top-0 after:invisible hover:after:visible after:h-1 after:w-full after:duration-500 after:delay-200 hover:after:h-full before:left-1/5 after:bg-green-900">
                                <p className="text-white duration-500 delay-150 text-center text-lg z-20 ">Cards</p>
                            </Link>
                        </li>
                        <li className="w-full h-full flex items-center justify-center">
                            <Link to='/loans' className="group w-2/3 h-full relative flex justify-center align-center px-1 py-1 transition-all before:ease-out before:rounded-2xl before:absolute before:top-0 before:w-0 before:h-1 hover:before:w-full before:left-1/5 before:bg-green-900 before:duration-300 after:rounded after:absolute after:top-0 after:invisible hover:after:visible after:h-1 after:w-full after:duration-500 after:delay-200 hover:after:h-full before:left-1/5 after:bg-green-900">
                                <p className="text-white duration-500 delay-150 text-center text-lg z-20 ">Loans</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='w-1/3'>
                    <Link to='/signin'>
                        {!logged && <button className="w-24 h-10 rounded-md text-white hover:text-gray-300 bg-green-700 transition duration-100 ease-in-out border-2 hover:border-green-700 hover:bg-transparent" to='/signin'>Sign In</button>}
                        {logged && <button className="w-24 h-10 rounded-md text-white hover:text-grays-300 bg-red-900 transition duration-100 ease-in-out border-2 hover:border-red-900 hover:bg-transparent" to='/signin'>Logout</button>}
                    </Link>
                </div>
            </div>
        </nav>
     );
}
 
export default NavBar;