import { useState } from 'react';
import { useRouter } from "next/router"
import Select from 'react-select';

import { motion } from 'framer-motion'

import { API_URL } from '../constants';

import Backdrop from './Backdrop';
import Button from './Button';
import Modal from './Modal';

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

const TABLES = [
    { value: "2-1", label: "2nde 1"},
    { value: "2-2", label: "2nde 2"},
    { value: "2-3", label: "2nde 3"},
    { value: "1-1", label: "1ère 1"},
    { value: "1-2", label: "1ère 2"},
    { value: "1-3", label: "1ère 3"},
    { value: "T-1", label: "Term 1"},
    { value: "T-2", label: "Term 2"},
    { value: "T-3", label: "Term 3"},
]

const ValidateTablePopUp = ({ handleClose, tableID }) => {

    const [tableChosen, setTableChosen] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSelectChange = newValue => {
        setTableChosen(newValue);
    }

    const onCancel = () => {
        handleClose();
        setErrorMessage("");
    }

    const onSubmit = async () => {

        if(!tableChosen) {
            setErrorMessage("Vous devez séléctionner une table");
            return;
        }

        setErrorMessage("");

        const body = JSON.stringify({
            location: tableChosen.value,
        })

        const url = new URL(`${API_URL}/settle-table`);
        url.search = new URLSearchParams([["tableid", tableID.current],])
        
        const res = await fetch(url, { method: "PUT", body });
        const data = await res.json();

        if(data?.status === "ok") {
            handleClose(); // Leave the page
            router.replace("/home");
        } else {
            setErrorMessage(data.message); // Display the error message
        }
    }

    return (
        <Modal
            className="
                w-[90%] lg:w-[60%] h-[40%] rounded-lg
                flex flex-col items-center justify-evenly
            "
            handleClose={handleClose}
        >
            <form className="
                w-5/6 h-3/5
                text-2xl
                lg:text-4xl
                flex flex-col items-center justify-center
            ">
                <label className="font-bold mb-4 text-center">Séléctionnez la table où vous êtes</label>
                <Select
                    isClearable
                    onChange={handleSelectChange}
                    options={TABLES}
                    className="w-4/5"
                    placeholder="Votre table"
                />

                {errorMessage ? <p className="text-lg lg:text-3xl text-red-700">{errorMessage}</p> : null}
            </form>
            <div className="
                w-5/6 h-1/5
                flex justify-evenly
            ">
                <Button className=" popup-btn" onClick={onCancel}>Annuler</Button>
                <Button className=" popup-btn" onClick={onSubmit}>Valider</Button>
            </div>
        </Modal>
    )
}


export default ValidateTablePopUp;