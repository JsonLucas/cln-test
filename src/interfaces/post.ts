export interface IPost{
	id: number,
	username: string,
	created_datetime: Date,
	title: string,
	content: string,
}

export type Post = Omit<IPost, 'id' | 'created_datetime'>;
export type PostUpdate = Pick<IPost, 'title' | 'content'>;