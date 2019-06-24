import { Post } from './post';
import { Reply } from './reply';

export class User {
    id: string;
    userName: string;
    imageUrl: string;
    rating: number;
    registeredAt: Date;
    postsAndRepliesCount: number;

    posts: Post[] = [];
    acclaimedPosts: Post[] = [];
    replies: Reply[] = [];
}
