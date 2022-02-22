import { useState } from 'react';
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';
import Button from './Button';
import Modal from './Modal';

import { API_URL } from '../constants';

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25, // Energy loss from friction
            stiffness: 500, // Speed of the fall
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
}

const AddMemberByHandPopUp = ({ handleClose, tableID, ownerAsked, setOwnerAsked }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [classID, setClassID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onCancel = () => {
        handleClose();
        setErrorMessage("");
    }

    const onSubmit = async () => {

        // TODO: Check the strings are decent use the input fields, not the states
        if(!firstname) {
            setErrorMessage("Vous devez fournir un prénom");
            return;
        }
        if(!lastname) {
            setErrorMessage("Vous devez fournir un nom");
            return;
        }
        if(!classID) {
            setErrorMessage("Vous devez fournir une classe");
            return;
        }

        setErrorMessage("");

        // stateName.target.value to prevent circular structure in stringify, as a state is not just the value
        let body = JSON.stringify({
            firstname: firstname.target.value,
            lastname: lastname.target.value,
            classID: classID.target.value,
        });

        const url = new URL(`${API_URL}/add-member`);
        url.search = new URLSearchParams([["tableid", tableID.current],])
        
        try {
            const res = await fetch(url, { method: "PUT", body, headers: {
                "Content-type": "application/json"
            }, });
            const data = await res.json();
    
            if(data?.status === "ok") {
                setOwnerAsked(false);
                handleClose(); // Leave the page
            } else {
                setErrorMessage(data.message); // Display the error message
            }
        } catch(error) {}
    }

    return (
        <Modal
            handleClose={handleClose}
            className="
                w-[90%] lg:w-[60%] h-[40%] rounded-lg
                flex flex-col items-center justify-evenly
            "
        >
            <form className="
                w-5/6 h-3/5
                text-2xl
                lg:text-4xl
                flex flex-col items-center justify-center
            ">
                <label className="font-bold mb-2 text-center">{ownerAsked ? "N'oublie pas de t'inscrire toi-même !" : "Ajouter un membre"}</label>
                <input type="text" placeholder="Prénom" className="popup-form-input" onChange={setFirstname} />
                <input type="text" placeholder="Nom" className="popup-form-input" onChange={setLastname} />
                <input type="text" placeholder="Classe" className="popup-form-input" onChange={setClassID} />

                {errorMessage ? <p className="text-center text-lg lg:text-3xl text-red-700">{errorMessage}</p> : null}
            </form>
            <div className="
                w-5/6 h-1/5
                flex justify-evenly
            ">
                <Button className=" popup-btn" onClick={onCancel}>Annuler</Button>
            <Button className=" popup-btn" onClick={onSubmit}>Ajouter</Button>
            </div>
        </Modal>
    );
}

export default AddMemberByHandPopUp;