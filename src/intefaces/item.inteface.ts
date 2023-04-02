export interface ItemInterface {
    id: string,
    image: string,
    title: string,
    sub_title: string,
    text: string,
    onImageClick: (object) => void
}