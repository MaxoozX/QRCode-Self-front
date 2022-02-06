import { motion } from "framer-motion"

const Button = ({ onClick, children, className}) => {

    return (<motion.button
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        className={"\
            bg-two \
            cursor-pointer \
            p-5 \
        " + className}
    >
        {children}
    </motion.button>)
}

export default Button;