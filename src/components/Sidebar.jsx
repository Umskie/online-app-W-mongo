import { Link } from 'react-router-dom';
import '../sidebar.css';
const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;