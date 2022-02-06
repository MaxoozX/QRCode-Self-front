import { motion } from 'framer-motion'

import Backdrop from './Backdrop';

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
            damping: 20, // Energy loss from friction
            stiffness: 500, // Speed of the fall
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
}

const Modal = ({ handleClose, children, className }) => {

    return (<Backdrop onClick={handleClose}>
        <motion.div
            onClick={e => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={"absolute bg-four " + className}
        >
            {children}
        </motion.div>
    </Backdrop>);
}


export default Modal;