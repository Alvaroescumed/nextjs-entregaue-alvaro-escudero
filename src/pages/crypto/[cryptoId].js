import Link from 'next/link';
import styles from './CryptoDetail.module.css'
import { useFetch } from '@/hooks/useFetch';

// Iteeramos un array de objetos con una propiedad params par los paths de las webs
export async function getStaticPaths() {
    
    const data =  await useFetch('https://api.coincap.io/v2/assets');
    const cryptos = data.data;

    const paths = cryptos.map((crypto)=> ({
        params: { cryptoId: crypto.id }
    }));


    return {
      paths,
      fallback: true, 
    };
}

export async function getStaticProps({ params }){

    const {cryptoId} = params;
    const data = await useFetch(`https://api.coincap.io/v2/assets/${cryptoId}`)
  
    return{
        props:{
            crypto: data.data,
        }
    }
}

export default function CryptoDetail({ crypto }) {
    return (
        <div className={styles.CryptoDetail}>
            <div className={styles.title}>
                <h1>{crypto?.symbol} - {crypto?.name}</h1>
            </div>
            <div className={styles.details}>
                <ul>
                    <li>Price USD: {crypto?.priceUsd ? parseFloat(crypto.priceUsd).toFixed(2) : 'No data'}$</li>
                    <li>MaxSupply: {crypto?.maxSupply ? parseFloat(crypto.maxSupply).toFixed(2) : 'No data'}</li>
                    <li>Change Percent 24h: { crypto?.changePercent24Hr ? parseFloat(crypto.changePercent24Hr).toFixed(2): 'No data'}</li>
                </ul>
                
            </div>
            <Link href="/" className={styles.back}> ⬅️ Volver</Link>
        </div>
    );
}
