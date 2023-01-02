export interface Book {
    id:string,
    title:number,
    price:number,
    description:string,
    author:string
}

export interface BookListState {
    books:Book[],
    isLoading:boolean,
    error:null | string
}