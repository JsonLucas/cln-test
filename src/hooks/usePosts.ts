import { MutationFunction, useMutation, useQuery } from "react-query";
import { createPost, deletePost, getPosts, updatePost } from "../actions/posts";
import { queryClient } from "../main";
import { Post, PostUpdate } from "../interfaces/post";

interface UpdatePost{
	postId: number, 
	content: PostUpdate
}

export const usePosts = () => {
	const { data, isLoading, error } = useQuery(['posts-list'], async () => {
		const data = await getPosts();
		return data;
	});

	const { mutateAsync: create } = useMutation(mutationCreate as MutationFunction, { onSuccess: () => queryClient.invalidateQueries(['posts-list']) });

	const { mutateAsync: update } = useMutation(mutationUpdate as MutationFunction, { onSuccess: () => queryClient.invalidateQueries(['posts-list']) });

	const { mutateAsync: remove } = useMutation(mutationDelete as MutationFunction, { onSuccess: () => queryClient.invalidateQueries(['posts-list']) });

	return { posts: { data, isLoading, error }, create, update, remove };
}

const mutationCreate = async (content: Post) => {
	await createPost(content);
}
const mutationUpdate = async ({ postId, content }: UpdatePost) => {
	await updatePost(postId, content);
}

const mutationDelete = async (postId: number) => {
	await deletePost(postId);
}