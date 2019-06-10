import { Post } from './post';

export class User {
    id: number;
    userName: string;
    rating: number;
    postsCount: number;
    repliesCount: number;
    imageUrl: string;
    registeredAt: Date;

    posts: Post[] = [];
}
