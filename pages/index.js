import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import { API_URL } from "../constants";

const GoogleOauthResponse = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(async ()=>{
        const query = Object.fromEntries(router.asPath.slice(2).split("&").map(str=>str.split("=")));

        if(!query.access_token || !query.state) return;

        let googleAPIUrl = new URL("https://www.googleapis.com/oauth2/v1/userinfo")
        googleAPIUrl.search = new URLSearchParams([["alt","json"], ["personFields", "names"], ["access_token", query.access_token]]).toString();

        const googleRes = await fetch(googleAPIUrl);
        googleRes = await googleRes.json();

        let ownAPIUrl = new URL(`${API_URL}/add-member`);
        ownAPIUrl.search = new URLSearchParams([["tableid", query.state],]).toString();

        const ownRes = await fetch(ownAPIUrl, {
            method: "PUT",
            body: JSON.stringify({
                firstname: googleRes.given_name,
                lastname: googleRes.family_name,
                classID: "?",
            })
        });

        const data = await ownRes.json();
        if(data?.status === "ok") {
            router.replace("/home");  // Leave the page
        } else {
            setErrorMessage(data.message) // Display an error message
        }

    }, []);

    return (<div
        className="
            w-full h-full
            flex flex-col justify-center items-center
            bg-three
        "
    >
        <p className="text-lg text-one">{ errorMessage ? errorMessage : "Joining the table..."}</p>
        
    </div>);
    

}

export default GoogleOauthResponse;