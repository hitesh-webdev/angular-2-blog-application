import { Comment } from './comment';

export class Post {
    constructor(public postId: number, public title: string, public author: string, public timestamp: string, public imagePath: string, public content: string, public tags: string[], public comments: Comment[]) {}
}
