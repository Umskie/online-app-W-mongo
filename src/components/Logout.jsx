import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appcontextprovider";

const Logout = () => {
    const { setIslogin, setUser } = useContext(AppContext);

    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem('shoppingToken');
        setIslogin(false);
        setUser(null);
        navigate('/');
    }, [])
}

export default Logout
