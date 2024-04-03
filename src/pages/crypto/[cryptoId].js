export async function getStaticPaths() {
    const res = await fetch(`https://api.coincap.io/v2/assets`);
    const data = await res.json();

    const paths = data.data.map((crypto)=> ({
        params: { cryptoId: crypto.id }
    }));


    return {
      paths,
      fallback: true, 
    };
}

export async function getStaticProps({ params }){

    const {cryptoId} = params;
    const res = await fetch(`https://api.coincap.io/v2/assets/${cryptoId}`);
    const data = await res.json();

    return{
        props:{
            crypto: data.data,
        }
    }
}

export default function CryptoDetail({ crypto }) {
    return (
        <>
            <h1>{crypto?.symbol} - {crypto?.name}</h1>
            <ul>
                <li>Price USD: {crypto?.priceUsd ? parseFloat(crypto.priceUsd).toFixed(2) : 'No data'}$</li>
                <li>MaxSupply: {crypto?.maxSupply ? parseFloat(crypto.maxSupply).toFixed(2) : 'No data'}</li>
                <li>Change Percent 24h: { crypto?.changePercent24Hr ? parseFloat(crypto.changePercent24Hr).toFixed(2): 'No data'}</li>
            </ul>
        </>
    );
}
