import { Reply } from './reply';

export class Post {
    id: number;
    title: string;
    body: string;

    authorId: string;
    authorUserName: string;
    authorRating: number;
    repliesCount: number;
    postedAt: Date;
    authorRegisteredAt: Date;
    authorPostsAndRepliesCount: number;

    replies: Reply[] = [];
}