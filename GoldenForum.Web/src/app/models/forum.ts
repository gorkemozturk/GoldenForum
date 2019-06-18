import { Post } from './post';

export class Forum {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    
    posts: Post[] = [];
    attachedPosts: Post[] = [];
    closedPosts: Post[] = [];
}