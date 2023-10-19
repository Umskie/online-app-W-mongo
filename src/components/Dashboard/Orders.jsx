import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, SERVER_ROOT } from "../../config";

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        const token = sessionStorage.getItem('shoppingToken');
        if (!token) {
            alert('token is not available. please login again');
            navigate('/login');
            return;
        }

        const headers = new Headers();
        headers.set('Authorization', `Bearer ${token}`);

        setIsLoading(true);
        const response = await fetch(API_URL + '/order/getorders', {
            headers: headers,
            method: 'GET'
        });
        const data = await response.json();

        setIsLoading(false);

        if (data.error) {
            alert(data.errorMessage);
            return;
        }

        setOrders(data.data);
        // console.log(data.data);

    }

    return (
        <>
            {isLoading && <h1 className="text-center">Fetching Orders...</h1>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr key={'row-' + index}>
                                <td>{(index + 1) + ')'}</td>
                                <td>
                                    <img width={50} height={50} src={SERVER_ROOT + '/products_images/' + order.image} />
                                </td>
                                <td>{order.productName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>

        </>
    )
}

export default Orders
