export type BookListResult = {
    items: BookResult[];
};

export type BookResult = {
    id: string,
    volumeInfo?: BookResultVolumeInfo;
};

export type BookResultVolumeInfo = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
};
