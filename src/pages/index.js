import Head from "next/head";
import Link from "next/link";


export async function getStaticProps(){
    const res = await fetch('https://api.coincap.io/v2/assets');
    const data = await res.json();
    const cryptos = data.data;

    return{
        props:{
            cryptos,
        }
    }
}

export default function Home({cryptos}){
    return(
        <>
            <Head>
                <title>Home - Crypto</title>
                <meta name="Web para ver todas las monedas con sus precios actuales" content="Crypto Blog"/>
            </Head>
            <main>
                <h1>Crypto List</h1>
                <p>Aqui puedes comprobar todas las monedas existentes y sus precios</p>
                <ul>
                    {cryptos.map(crypto => (
                        <li key={crypto.id}>
                            <Link href={`/crypto/${crypto.id}`}>{crypto.name}</Link><p> USD: {parseFloat(crypto.priceUsd).toFixed(2)} $ </p> {/* Ponemos dos decimales solo para el precio */}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}