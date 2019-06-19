import { Reply } from './reply';
import { User } from './user';

export class Post {
    id: number;
    title: string;
    body: string;
    repliesCount: number;
    postedAt: Date;
    modifiedAt?: Date;
    isDeleted: boolean;
    type: string;

    author: User = new User();
    replies: Reply[] = [];
}