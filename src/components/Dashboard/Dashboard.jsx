import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useContext } from "react";
import { AppContext } from "../../appcontextprovider";

const Dashboard = () => {

    const { user } = useContext(AppContext);


    return (
        user ? <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <div className="container mt-5">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
            :
            <Navigate to='/login' />
    )
}


export default Dashboard