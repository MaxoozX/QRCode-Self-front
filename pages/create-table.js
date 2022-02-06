import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import useInterval from "../hooks/useInterval";
import QRCode from "qrcode.react";

import { motion, AnimatePresence } from 'framer-motion';

import MemberList from '../Components/MemberList';
import AddMemberByHandPopUp from '../Components/AddMemberByHandPopUp';
import ValidateTablePopUp from '../Components/ValidateTablePopUp';
import BackArrow from '../Components/BackArrow';
import Button from '../Components/Button';

import { API_URL, LOCAL_URL } from '../constants';

const CreateTable = () => {

    const tableID = useRef();
    const [requesting, setRequesting] = useState(false);

    const [ownerPrompted, setOwnerPrompted] = useState(true);

    const [addMemberPopUpVisible, setAddMemberPopUpVisible] = useState(true);
    const closeMemberPopUp = () => setAddMemberPopUpVisible(false);
    const openMemberPopUp = () => setAddMemberPopUpVisible(true);

    const [validateTablePopUpVisible, setValidateTablePopUpVisible] = useState(false);
    const openValidatePopUp = () => setValidateTablePopUpVisible(true);
    const closeValidatePopUp = () => setValidateTablePopUpVisible(false);

    const [members, setMembers] = useState([]);
    const [width, setWidth] = useState(0);

    const updateTableContent = () => {
        if(!tableID.current) return;
        fetch(`${API_URL}/table-info?tableid=${tableID.current}`, {
            method: "GET",
        })
            .then(res=>res.json())
            .then(data=>{
                setMembers(data);
            })
    }

    const makeJoinTableURL = () => {
        let url = new URL(`${LOCAL_URL}/join-table`);
        url.search = new URLSearchParams([["tableid", tableID.current]]).toString();
        return url.toString();
    }

    useInterval(updateTableContent, 5000);

    useEffect(async () => {

        setRequesting(true);

        const res = await fetch(new URL(`${API_URL}/create-table`), {
                method: "POST",
            });
        const data = await res.json();
        tableID.current = data["table-ID"];

        setRequesting(false);

        setWidth(window.innerWidth);

    }, []);

    return (<main className="
        w-full min-h-full
        lg:p-4
        flex flex-col justify-center items-center
        bg-three
        text-one
        ">
            <BackArrow />
            <div className="
                w-full mb-auto
                lg:w-[95%] lg:h-[95%]
                flex flex-col items-center
            ">
                <h1 className="
                    font-bold
                    text-5xl
                    mt-6
                ">Votre table</h1>
                <div className="
                    w-full
                    flex flex-col items-center justify-evenly
                ">
                    <div className="
                        w-full
                        flex items-center justify-center
                        mt-5
                        p-2
                    ">
                        {requesting ? 
                            <p className="text-2xl text-center">Connexion avec le serveur...</p> :
                            (tableID.current ?
                                <div className="
                                    flex flex-col items-center justify-center

                                ">
                                    {/* <span className="text-xl my-2">{tableID.current}</span> */}
                                    <div className="bg-[#DFD4CD] p-3 rounded-xl">
                                        <QRCode value={makeJoinTableURL()} size={width*0.75} className="" bgColor="#DFD4CD" fgColor="#36382e"/>
                                    </div>
                                    <a href={makeJoinTableURL()} target="_blank" className="text-sm lg:visible">{makeJoinTableURL()}</a>
                                </div> : 
                                <p className="text-2xl text-center">Problème de connexion avec le serveur</p>)}
                        {/* TODO: Pass an appropriate size to the QRCode */}
                    </div>
                    <div className="
                        w-full
                        flex flex-col items-center
                    ">
                        <div className="flex justify-evenly w-full items-center m-4 mb-2">
                            <h2 className="
                                text-3xl
                            ">Membres de la table :</h2>
                            <div className="flex items-center justify-center w-16 h-16 text-3xl  rounded-full border-2">
                                <span className="align-top pb-1.5">{members.length}/8</span>
                            </div>
                        </div>
                        <MemberList members={members} tableID={tableID} />
                        <Button
                            onClick={openMemberPopUp}
                            className="
                                text-2xl font-bold
                                mt-2 mb-4
                                rounded-lg p-2
                            "
                        >Ajouter manuellement</Button>
                        <Button
                            onClick={openValidatePopUp}
                            className="
                                text-2xl font-bold
                                mt-2 mb-4
                                rounded-lg p-2
                            "
                        >Valider la table</Button>
                    </div>
                </div>
            </div>

            <AnimatePresence
                initial={false} // Not animation on first appear
                exitBeforeEnter={true} // wait for the animations to end
            >
                { addMemberPopUpVisible &&  <AddMemberByHandPopUp handleClose={closeMemberPopUp} tableID={tableID} ownerAsked={ownerPrompted} setOwnerAsked={setOwnerPrompted} /> }
                { validateTablePopUpVisible && <ValidateTablePopUp handleClose={closeValidatePopUp} tableID={tableID}/> }
            </AnimatePresence>
            
            
    </main>);
}

export default CreateTable;

// https://coolors.co/palette/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08
// https://coolors.co/palette/f06449-ede6e3-dadad9-36382e