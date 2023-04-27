import { api } from ".."
import { Post, PostUpdate } from "../../interfaces/post";

export const getPosts = async () => {
	const { data } = await api.get('/');
	return data.results;
}

export const createPost = async (content: Post) => {
	const { data } = await api.post('/', content);
	return data;
}

export const updatePost = async (postId: number, content: PostUpdate) => {
	const { data } = await api.patch(`/${postId}/`, content);
	return data;
}

export const deletePost = async (postId: number) => {
	const { data } = await api.delete(`/${postId}/`);
	return data;
}