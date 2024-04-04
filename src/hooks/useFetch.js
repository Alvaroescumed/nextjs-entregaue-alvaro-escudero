
// creamos un hook de fetch ya que se usa bastante a lo largo del codigo
export async function useFetch(url){

    const res =  await fetch(url);
    const data = await res.json();

    return data;

}