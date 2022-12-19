const Account = ({user, children}) => {
    return ( 

        <div className='container'>
            <h1 className="p-20">{user.first_name}'s account</h1>
            {children}
        </div>


     );
}
 
export default Account;