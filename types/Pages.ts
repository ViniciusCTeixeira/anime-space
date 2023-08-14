export type WebsitesProps = {
    id: string;
    name: string;
    url: string;
    image: string;
    isFavorite?: boolean | null;
    lastAcess?: string
};

export type ToSearchProps = {
    id: string;
    name: string;
}