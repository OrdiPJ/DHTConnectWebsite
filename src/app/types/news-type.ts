export interface NewsType {
    title: string,
    content: string,
    author: string,
    date: { seconds: number, nanoseconds: number}
}
