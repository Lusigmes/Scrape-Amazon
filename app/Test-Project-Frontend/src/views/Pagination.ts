// Classe genérica para lidar com paginação de qualquer tipo de item
// Generic class to handle pagination of any type of item
export class Paginator<T>{
    private items: T[];
    private pageSize: number;
    private currentPage: number;

    constructor(items: T[], pageSize:number){
        this.items = items;
        this.pageSize = pageSize;
        this.currentPage = 1;
    }

    getPage(page:number): T[]{
        this.currentPage = page;
        const start = (page - 1) * this.pageSize;
        return this.items.slice(start, start+ this.pageSize);
    }

    getCurrentPage(): number{
        return this.currentPage;
    }

    getTotalPages(): number{
        return Math.ceil(this.items.length/this.pageSize);
    }
    // Avança para a próxima página, se possível
    // Advance to the next page, if possible
    nextPage(): T[] | null{
        if(this.currentPage < this.getTotalPages()){
            this.currentPage++;
            return this.getPage(this.currentPage);
        }
        return null;
    }
    // Volta para a página anterior, se possível
    // Go back to the previous page, if possible
    prevPage(): T[] | null{
        if(this.currentPage > 1){
            this.currentPage--;
            return this.getPage(this.currentPage);
        }
        return null;
    }

}