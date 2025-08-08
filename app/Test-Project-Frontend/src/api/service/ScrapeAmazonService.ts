import type { Product } from "../../types/Product";
// Obtém a URL da API a partir das variáveis de ambiente
// Get the API URL from the environment variables
const API_URL = import.meta.env.VITE_API_URL;

export async function searchProducts(stringSearch: string) : Promise<Product[]> {
    // Faz requisição GET para a API de scraping
    // Makes a GET request to the scraping API
    const res = await fetch(`${API_URL}/api/scrapeAmazon?stringSearch=${encodeURIComponent(stringSearch)}`);
    const data = await res.json();
    
    if(data.error){
        throw new Error(data.error);
    }

    return data.produtos as Product[];

};