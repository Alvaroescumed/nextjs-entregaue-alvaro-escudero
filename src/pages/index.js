import Head from "next/head";
import Link from "next/link";
import styles from './styles/Home.module.css';
import { useFetch } from "@/hooks/useFetch";

// hacemos fetch para traer los datos de la url
export async function getStaticProps(){
    
    const data =  await useFetch('https://api.coincap.io/v2/assets');
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
            <main className={styles.main}>
                <h1 className={styles.title}>Crypto List 💰</h1>
                <h2 className={styles.description}> Aqui puedes comprobar todas las monedas existentes y sus precios</h2>
                <ul className={styles.list}>
                    {cryptos.map(crypto => (
                        <li key={crypto.id}>
                            <Link href={`/crypto/${crypto.id}`}>{crypto.name}</Link><p className={styles.price}> USD: {parseFloat(crypto.priceUsd).toFixed(2)} $ </p> {/* Ponemos dos decimales solo para el precio */}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}