import { Forum } from './forum';

export class Category {
    id: number;
    categoryName: string;
    priority: number;
    
    forums: Forum[] = [];
}