export interface Comment {
    _id: string;
    video_id: string;
    created: string;
    user: {
        username: string;
        name: string;
        base64_photo: string;
    };
    comment: string;
}
