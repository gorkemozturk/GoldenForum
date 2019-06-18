import { User } from './user';

export class Reply {
    id: number;
    body: string;
    repliedAt: Date;

    author: User = new User();
}