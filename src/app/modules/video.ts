export interface Video {
    _id: string;
    intake: string;
    module: string;
    user: {
        username: string;
        name: string;
    };
    title: string;
    description: string;
    uploaded: Date;
    videoLength: number;
    recordedAt: string;
    views: number;
    favourites: number;
    url: string;
}
