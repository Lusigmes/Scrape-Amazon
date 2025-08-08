import type { Product } from "../../types/Product";
import type { Paginator } from "../../views/Pagination";
import { renderProducts } from "../../views/RenderProduct";

// Renderiza os botões de paginação abaixo dos resultados
// Renders the pagination buttons below the results
export function renderPaginationControl(paginator: Paginator<Product>, results:HTMLElement){
    const totalPages = paginator.getTotalPages();

    // Remove controles antigos, se existirem
    // Remove old controls, if any
    const old = document.getElementById("pagination-controls");
    if(old) old.remove();

    if(totalPages <= 1) return;

    const controls = document.createElement("div");
    controls.id = "pagination-controls";
    controls.style.textAlign = "center";
    controls.style.marginTop = "20px";

    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");
    const pageIndicator = document.createElement("span");

    prevBtn.textContent = "« Prev";
    nextBtn.textContent = "Next »";
    pageIndicator.style.margin = "0 12px";
    pageIndicator.textContent = `Page 1 of ${totalPages}`;
    prevBtn.disabled = true;

    // Adiciona os elementos ao DOM
    // Add the elements to the DOM
    controls.appendChild(prevBtn);
    controls.appendChild(pageIndicator);
    controls.appendChild(nextBtn);
    results.insertAdjacentElement("afterend", controls);

    // Evento: clique no botão "anterior"
    // Event: "previous" button click
    prevBtn.addEventListener("click", ()=>{
        const prevPage = paginator.prevPage();
        if(prevPage){
            renderProducts(prevPage, results);
            pageIndicator.textContent = `Page ${paginator.getCurrentPage()} of ${totalPages}`;
            prevBtn.disabled = paginator.getCurrentPage() === 1;
            nextBtn.disabled = false;
        }
    });

    // Evento: clique no botão "próximo"
    // Event: click on the "next" button
    nextBtn.addEventListener("click", ()=>{
        const nextPage = paginator.nextPage();
        if(nextPage){
            renderProducts(nextPage, results);
            pageIndicator.textContent = `Page ${paginator.getCurrentPage()} of ${totalPages}`;
            nextBtn.disabled = paginator.getCurrentPage() === totalPages;
            prevBtn.disabled = false;
        }
    });

}