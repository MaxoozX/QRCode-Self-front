import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"

import { motion } from "framer-motion";

import Button from '../Components/Button';

export default function Home() {
  return (<>
    <Head>
      <title>Self LP2I</title>
    </Head>
    <div className="w-full h-full">
      <main className="w-full h-full bg-three text-one">
        <div className="
          w-full h-full
          flex flex-col
          justify-center items-center
        ">
          <h1 className="
            text-5xl
            font-bold
            mb-10
            text-center
          ">Système de contact tracing</h1>
          <Link href="/create-table" passHref={true}>
            <Button
              className="
                font-bold text-4xl lg:text-5xl
                mb-2 rounded-2xl
              "
            >Créer une table</Button>
          </Link>
          <Link href="/tuto" passHref={true}>
            <Button
              className="
                font-bold text-3xl lg:text-4xl
                mb-2 rounded-2xl
              "
            >Comment ça marche ?</Button>
          </Link>
          <Link href="/about" passHref={true}>
            <Button
              className="
                font-bold text-3xl lg:text-4xl
                mb-2 rounded-2xl
              "
            >En savoir +</Button>
          </Link>
        </div>
        
      </main>

    </div>
    </>)
}
