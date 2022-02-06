import { IconContext } from "react-icons/lib"
import { MdOutlineTipsAndUpdates, MdDoneOutline } from "react-icons/md";
import { SiGooglesheets } from "react-icons/si";
import { IoMdArrowRoundForward } from "react-icons/io"

import BackArrow from "../Components/BackArrow";

const OrderedListElement = ({ children, idx, className, iconClassName }) => {

    return (<li className={"flex w-full my-5 "+ className} >
        <span className={"mr-3 " + iconClassName}>{idx}</span>
        <span>{children}</span>
    </li>)
}

const Emph = ({children}) => <span className="text-two">{children}</span>

const Tuto = () => {

    return <IconContext.Provider value={{ style: { verticalAlign: 'bottom' } }}><main className="w-full h-full bg-three text-one text-xl font-bold">
        <BackArrow />
        <ol className="w-full h-full p-2 flex flex-col justify-center">
            <h1 className="
                text-5xl
                font-bold
                mb-10 p-3 rounded-xl
                text-center
                bg-one text-three
            ">Comment ça marche ?</h1>
            <OrderedListElement idx={1} >
                L'un de vous <Emph>crée un groupe</Emph> virtuel.
            </OrderedListElement>
            <OrderedListElement idx={2}>
                Les autres membres du groupe <Emph>scannent le QR code</Emph> pour rejoindre.
            </OrderedListElement>
            <OrderedListElement idx={<MdOutlineTipsAndUpdates size={25} style={{ color: "#f59e0b"}}/>} className="items-center">
                Pas possible de scanner ? Vous pouvez <Emph>ajouter manuellement</Emph> des membres !
            </OrderedListElement>
            <OrderedListElement idx={3} >
                Une fois le groupe complet, le créateur la valide en <Emph>séléctionnant une table</Emph>.
            </OrderedListElement>
            <OrderedListElement
                idx={<span className="flex items-center">
                    <MdDoneOutline size={25} style={{ color: "#22c55e"}} />
                    <IoMdArrowRoundForward style={{ color: "#bbbbbb"}}/>
                    <SiGooglesheets style={{ color: "#22c55e"}} size={25} />
                </span>}
                iconClassName="w-16"
                className="items-center"
            >
                La table est enregistrée et transmise à l'administration
            </OrderedListElement>
        </ol>
    </main></IconContext.Provider>
}

export default Tuto;