import { useState, useEffect } from 'react';
import QRCode from "qrcode.react";

const API_URL = "the-url-of-the-api.fr"

const CreateTable = () => {

    const [tableID, setTableID] = useState(null);
    const [requesting, setRequesting] = useState(false);

    useEffect(() => {
        // setRequesting(true);
        // fetch(`${API_URL}/create-table`)
        //     .then(res=>res.json())
        //     .then(data=>{
        //         setTableID(data.tableID);
        //         setRequesting(false);
        //     })
    }, []);    

    return (<div className="p-4">
        <h1 className="text-3xl">Création de table</h1>
        {requesting ? <p>Connexion avec le serveur...</p> : null}
        {tableID ? <QRCode value={`${API_URL}/join-room?tableid=${tableID}`} /> : null}
        <QRCode value="google.com" />
    </div>);
}

export default CreateTable;
