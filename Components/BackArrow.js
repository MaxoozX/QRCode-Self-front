import { IoArrowBack } from "react-icons/io5"

import { useRouter } from "next/router";

import Button from "./Button";

const BackArrow = () => {

    const router = useRouter();

    return (
        <Button
            className="
                absolute top-2 left-2
                bg-[#f06449] rounded-full !p-2
            "
            onClick={()=>router.replace("/home")}
        >
            <IoArrowBack size={25} style={{color: "#ede6e3"}}/>
        </Button>
    )
}

export default BackArrow;