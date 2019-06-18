import { Reply } from './reply';
import { User } from './user';

export class Post {
    id: number;
    title: string;
    body: string;
    repliesCount: number;
    postedAt: Date;

    author: User = new User();
    replies: Reply[] = [];
}