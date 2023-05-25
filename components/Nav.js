
import{ Link, useNavigate} from 'react-router-dom';
const Nav=()=>{
    // after signup it will hide and display logout
    const auth = localStorage.getItem('user');

    //to fix bog by redenring
    const navigate = useNavigate();
// function for logout 
    const logout =()=> {
        localStorage.clear();
        navigate("/signup")
    }
    return(
        <div>
            <ul className='nav-ul'>
                <li><Link to="/">Food Category</Link></li>
                <li><Link to="/add">Add Food</Link></li>
                <li><Link to="/update">Update Food</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>
                    { auth ?<Link onClick={logout} to="/signup">LogOut</Link> :
                    <Link to="/signup">Sign Up</Link>}</li>
                    <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    )
}
export default Nav;
