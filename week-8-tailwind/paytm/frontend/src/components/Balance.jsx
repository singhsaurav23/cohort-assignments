import { useEffect, useState } from "react"
import axios from "axios";

export const Balance = () => {

    const [amt, setAmt] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )
            .then(response => {
                const inputValue = parseFloat(response.data.balance);
                setAmt(parseFloat(inputValue.toFixed(2)));
            })
    }, [])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {amt}
        </div>
    </div>
}