import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
// import Layout from '../Layout/Layout';
import "./Sidebar.css";
import {ReactComponent as Home } from "../../Images/Home.svg";
import {ReactComponent as User } from "../../Images/User.svg";
import {ReactComponent as Dashboard } from "../../Images/Dashboard.svg";
import {ReactComponent as Cart } from "../../Images/Cart.svg";
import {ReactComponent as Pie } from "../../Images/Pie.svg";
import {ReactComponent as Abc } from "../../Images/Abc.svg";
// import Login from '../Login/Login';

function Sidebar() {

    const authCtx = useContext(AuthContext);
    // const [isLoggedIn, setIsLoggedIn] = useState(authCtx.isLoggedIn)
    const isLoggedIn = authCtx.isLoggedIn;
    console.log(isLoggedIn);

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <div>
            {/* {
                !isLoggedIn && (
                    <div>
                        <h2>hellog</h2>
                    </div>
                )
            } */}
            {isLoggedIn && (
                <div className="sidebar">
                    <b><p style={{marginLeft : "15px" , marginTop: "50px"}}>Rootlab</p></b>
                    <div className="links">

                        <NavLink to='/Home' activeClassName="active">
                            <Home fill="#1a1a1a" style={{marginTop : "20px"}} className='Home-1'></Home>
                            <h4 style={{marginLeft : "20px"}}>Home</h4>
                        </NavLink>
                        <NavLink to='/AddCustomerForm' activeClassName="active">
                            <User style={{marginTop : "20px"}}></User>
                            <h4 style={{marginLeft : "20px"}}>Add Order</h4>
                        </NavLink>
                        <NavLink to='/CustomerBoard' activeClassName="active">
                            <Dashboard style={{marginTop : "20px"}}></Dashboard>
                            <h4 style={{marginLeft : "20px"}}>Customer Board</h4>
                        </NavLink>
                        <NavLink to='/Inventory' activeClassName="active">
                            <Abc style={{marginTop : "20px"}}></Abc>
                            <h4 style={{marginLeft : "20px"}}>Inventory</h4>
                        </NavLink>
                        {/* <NavLink to='/AddInventory' activeClassName="active">
                    <h4>Add Inventory</h4>
                </NavLink> */}
                        <NavLink to='/CompletedOrders' activeClassName="active">
                        <Cart style={{marginTop : "20px"}}></Cart>
                            <h4 style={{marginLeft : "20px"}}>Completed Orders</h4>
                        </NavLink>
                        {/* <NavLink to='/Login' activeClassName='active'>
                            <h4>Login</h4>
                        </NavLink> */}
                        <NavLink to='/Statistics' activeClassName="active">
                            <Pie style={{marginTop : "20px"}}></Pie>
                            <h4 style={{marginLeft : "20px"}}>Statistics</h4>
                        </NavLink>
                        <br></br>


                        {/* <NavLink to='/'>
                            <h4 onClick={logoutHandler}>Logout</h4>
                        </NavLink> */}
                        <button onClick={logoutHandler} style={{marginTop : "170px", backgroundColor : "#1a1a1a" , color: "#fff", padding : "13px 82px" ,borderRadius : "5px" , border : "none" }}><b>Logout</b></button>
                    </div>
                </div>
            ) 
            }

        </div>

    );
}

export default Sidebar;