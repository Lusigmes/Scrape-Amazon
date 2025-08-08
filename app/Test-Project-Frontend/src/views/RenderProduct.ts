import type { Product } from "../types/Product";
// Função responsável por renderizar os produtos na tela
// Function responsible for rendering products on the screen
export function renderProducts(produtos: Product[], container: HTMLElement){
    container.innerHTML = "";

    // Itera sobre cada produto e o adiciona ao contêiner
    // Iterate over each product and add it to the container
    produtos.forEach((produto) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3> ${produto.title} </h3>
        <p> ${produto.rating} - ${produto.reviews} reviews </p>
        <img src="${produto.imageUrl}" alt="Product Image">
        `;
        container.appendChild(div);
    });
}

