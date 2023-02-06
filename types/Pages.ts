export type WebsitesProps = {
    id: string;
    name: string;
    url: string;
    image: string;
    isFavorite?: boolean | null;
};

export type MangasToSearchProps = {
    id: string;
    name: string;
}