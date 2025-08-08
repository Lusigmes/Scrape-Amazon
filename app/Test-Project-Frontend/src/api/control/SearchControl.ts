import type { Product } from "../../types/Product";
import { searchProducts } from "../service/ScrapeAmazonService";
import { Paginator } from "../../views/Pagination";
import { renderProducts } from "../../views/RenderProduct";
import { renderPaginationControl } from "./RenderPaginationControl";

// Controlador principal da busca
// Main search controller
export class SearchControl{
    private stringInput: HTMLInputElement;
    private divResult: HTMLElement;
    private paginator: Paginator<Product> | null = null;
    private readonly pageSize = 8;

    constructor(inputId: string, resultId: string, buttonId: string){
        this.stringInput = document.getElementById(inputId) as HTMLInputElement;
        this.divResult = document.getElementById(resultId) as HTMLDivElement;
        const button = document.getElementById(buttonId) as HTMLButtonElement;
    
        button.addEventListener("click", () => this.handleSearch());
        this.stringInput.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "Enter") {
        this.handleSearch();
        }
  });
    }

    private async handleSearch(){
        const stringSearch = this.stringInput.value.trim();
        if(!stringSearch) return;

        this.divResult.innerHTML = "Loading . . .";

        try {
            // Faz a busca e inicializa o paginador
            // Performs the search and initializes the pager
            const products = await searchProducts(stringSearch);
            this.paginator = new Paginator(products, this.pageSize);
            // Renderiza os produtos da primeira página           
            // Render the products on the first page
            const firstPage = this.paginator.getPage(1);
            renderProducts(firstPage, this.divResult);
            // Renderiza os controles de paginação
            // Render the pagination controls
            renderPaginationControl(this.paginator, this.divResult);
            this.stringInput.value = "";
        } catch (error) {
            this.divResult.innerHTML = `<p>Error to search products</p>`;
        }
    }


}