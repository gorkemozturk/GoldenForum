import { Post } from './post';

export class User {
    id: string;
    userName: string;
    imageUrl: string;
    rating: number;
    registeredAt: Date;
    postsAndRepliesCount: number;

    posts: Post[] = [];
}
