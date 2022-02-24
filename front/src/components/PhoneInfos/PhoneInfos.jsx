import { useEffect } from "react";
import { useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { BsBatteryHalf } from "react-icons/bs";
import "./PhoneInfos.css";

const PhoneInfos = () => {
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        let currentTimeDate = new Date();
        setHour(currentTimeDate.getHours() < 10 ? "0" + currentTimeDate.getHours() : currentTimeDate.getHours());
        setMinutes(currentTimeDate.getMinutes() < 10 ? "0" + currentTimeDate.getMinutes() : currentTimeDate.getMinutes());
    }, []);

    return (
        <div className="PhoneInfos">
            <div className="network">
                <GiNetworkBars />
                <span>Orange F</span>
                <span>4G</span>
            </div>
            <div className="hour">{`${hour}:${minutes}`}</div>
            <div className="local">
                <BsBatteryHalf />
            </div>
        </div>
    );
};

export default PhoneInfos;
