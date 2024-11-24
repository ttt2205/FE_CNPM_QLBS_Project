import axios from "axios";

export async function postRegisterCustomer(customerInfo) {
    return (await axios.post(
        `${process.env.REACT_APP_BACK_END_LOCALHOST}/api/customer/register`, customerInfo
    ).then(res => res.data));
}
