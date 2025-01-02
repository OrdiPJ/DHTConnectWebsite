export interface NewsType {
    title: string,
    content: string,
    imageURL: string,
    author: string,
    date: { seconds: number, nanoseconds: number}
}
