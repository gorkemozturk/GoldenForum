import { Reply } from './reply';

export class Post {
    id: number;
    title: string;
    authorId: string;
    authorUserName: string;
    authorRating: number;
    repliesCount: number;

    replies: Reply[] = [];
}
