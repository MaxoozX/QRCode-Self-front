import { IconContext } from "react-icons";
import { SiFastapi, SiPython, SiGooglesheets, SiNextdotjs, SiReact, SiJavascript, SiTailwindcss } from 'react-icons/si';

import BackArrow from "../Components/BackArrow";

const Emph = ({children}) => <span className="text-two">{children}</span>

const About = () => {

    return <IconContext.Provider value={{ style: { verticalAlign: 'bottom' } }}><main className="w-full h-full bg-three text-one text-xl flex flex-col items-center justify-center text-center font-bold">
        <BackArrow />
        <p className="">Ce site web <Emph>n'enregistre pas</Emph> vos informations personnelles, et <Emph>aucun cookie</Emph> n'est utilisé.</p>
        <article className="my-10">
            <h2>Technologies utilisées :</h2>
            <ul className="about-techstack-ul">
                <li>
                    <SiFastapi size={35} style={{ color: "#0d9488"}}/>
                    <span>FastAPI</span>
                </li>
                <li>
                    <SiPython size={35} style={{ color: "#f06449"}} />
                    <span>Python3</span>
                </li>
                <li>
                    <SiGooglesheets size={35} style={{ color: "#22c55e"}}/>
                    <span>Google Cloud</span>
                </li>
                <li>
                    <SiNextdotjs size={35}/>
                    <span>NextJS</span>
                </li>
                <li>
                    <SiReact size={35} style={{ color: "#38bdf8"}}/>
                    <span>React</span>
                </li>
                <li>
                    <SiJavascript size={35} style={{ color: "#facc15"}}/>
                    <span>JavaScript</span>
                </li>
                <li>
                    <SiTailwindcss size={35} style={{ color: "#67e8f9"}}/>
                    <span>TailwindCSS</span>
                </li>
            </ul>
        </article>
        <p>Pour + d'infos sur la création du site, contactez <a href="mailto:maxence.launay-querre@lp2i-poitiers.fr" className="text-two">Maxence Launay-Querré</a>.</p>
    </main></IconContext.Provider>
}

export default About;