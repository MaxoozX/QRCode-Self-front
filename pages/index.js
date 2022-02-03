import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Head>
        <title>QR Code - contact tracing</title>
        <meta name="description" content="Organisation pour le self du LP2I." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/create-table">
          <a className="text-xl">Créer une table</a>
        </Link>
      </main>

    </div>
  )
}
