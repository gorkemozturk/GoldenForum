import { Post } from './post';

export class Forum {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    
    posts: Post[] = [];
}