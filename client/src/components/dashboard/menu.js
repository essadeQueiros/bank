import { Link } from "react-router-dom";

const DashBoardMenu = () => {

    const icons = [
        {
            name: "Balance",
            url: "./balance"
        },
        {
            name: 'Cards',
            url: "./cards"
        },
        {
            name: 'Transfers',
            url: './transfers'
        }
    ]

    return ( 
        <div className="h-screen w-20 transition-all duration-1000 fixed top-0 pt-20 px-1 bg-green-400">
            <ul className=" w-full h-2/3 mx-auto mt-10">
                {icons.map((icon) => {
                    return(
                        <li className="group my-10 transition-all duration-1000 group overflow-hidden w-20 hover:w-60">
                            <Link to={icon.url} className="flex transition-all duration-1000 w-60 h-10">
                                <span className="h-full w-16 bg-red-600"></span>
                                <span className="rounded-xl bg-gray-700 py-1 px-1 border-2 border-white text-white transition-all duration-1000 flex items-center justify-center ml-4 w-2/3 h-full text-left">
                                    <span className="w-full h-full rounded-xl border-2 text-center border-white">
                                        {icon.name}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default DashBoardMenu;