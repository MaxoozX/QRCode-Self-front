import { useState, useRef } from "react";

import { API_URL } from "../constants";

const MembersListElement = ({ firstname, lastname, classID, ID, tableID }) => {

    const [classNames, setClassNames] = useState("");
    const stopTimer = useRef();
    const longClickDuration = 2000;

    const removeSelf = async () => {

        let url = new URL(`${API_URL}/remove-member`);
        url.search = new URLSearchParams([["tableid", tableID.current], ["memberid", ID]]).toString();

        const res = await fetch(url, {method: "DELETE"});
        const data = await res.json();
        if(data.status === "ok") {
            console.log("successfully removed member");
            setClassNames("invisible");
        } else {
            console.log(data.message);
        }

    }

    const onClickDown = () => {
        // console.log("down");
        stopTimer.current = setTimeout(removeSelf, longClickDuration);
    }

    const onClickUp = () => {
        // console.log("up");
        clearTimeout(stopTimer.current);
    }

    return (<li className={" \
        bg-[#574438] text-three \
        mx-2 my-5 p-1 \
        rounded-lg \
        text-xl \
    " + classNames } onTouchStart={onClickDown} onTouchEnd={onClickUp}>
        <span className="ml-4">{firstname}</span>
        <span className="mx-5">{lastname}</span>
        <span className="">{classID}</span>
    </li>);
}

export default MembersListElement;