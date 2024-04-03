
export async function getServerSideProps({params}){
    const {cryptoId} = params;
    const res = await fetch(`https://api.coincap.io/v2/assets/${cryptoId}`);
    const data = await res.json();
    const crypto = data.data;

    return {
        props: {
            crypto,
        }
    }

}

export default function CryptoDetail({crypto}){
    return(
        <>
            <h1>{crypto?.symbol}{crypto?.name}</h1>
            <ul>
                <li>Price USD: {parseFloat(crypto.priceUsd).toFixed(2)}$</li>
                <li>MaxSupply: {parseFloat(crypto.maxSupply).toFixed(2)}</li>
                <li>Change Percent 24h:  {parseFloat(crypto.changePercent24Hr).toFixed(2)}</li>
            </ul>
        </>
    )
}
