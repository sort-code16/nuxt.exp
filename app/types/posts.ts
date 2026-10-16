interface IDummyReactions {
    readonly likes: number;
    readonly dislikes: number;
}

export interface IDummyPost {
    readonly id: number;
    readonly title: string;
    readonly body: string;
    readonly userId: number;
    readonly views: number;
    readonly reactions: IDummyReactions;
    readonly tags: string[];
}

export interface IDummyPostsSearch {
    readonly posts: Pick<IDummyPost, 'id' | 'title' | 'body'>[];
    readonly limit: number;
    readonly total: number;
}
