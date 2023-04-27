import { Stack, FormControl, FormLabel, Input, Textarea, Text, Button, useToast } from "@chakra-ui/react";
import { IPost } from "../../../interfaces/post";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { usePosts } from "../../../hooks/usePosts";

interface Props{
	open: boolean,
	setOpen: (param: boolean) => void,
	post: IPost
}

export function ModalUpdatePost({ open, setOpen, post }: Props) {
	const toast = useToast();
	const [isLoading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm();
	const { update } = usePosts();
	const updatePost = async (data: any) => {
		setLoading(true);
		try{
			await update({ postId: post.id, content: data });
			toast({
				title: 'Postagem atualizada com sucesso!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
			setOpen(false);
		}catch(e: unknown){
			toast({
				title: 'Não foi possível atualizar a postagem.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
		}
		setLoading(false);
	}
	return (
		<Stack spacing={4} border='1px solid #999' w={['95%', '460px', '660px', '660px']} h='350px' bgColor='white' borderRadius={16} p='24px'>
			<Text fontSize='22px' fontWeight={700} fontFamily='Roboto'>Edit Item</Text>
			<form onSubmit={handleSubmit(updatePost)}>
				<FormControl fontFamily='Roboto'>
					<FormLabel size='16px'>Title</FormLabel>
					<Input {...register('title', { required: true, value: post.title })} placeholder='Hello world' w='100%' />
					<FormLabel mt='10px'>Content</FormLabel>
					<Textarea {...register('content', { required: true, value: post.content })} placeholder="Content here" resize='none' w='100%' h='74px'></Textarea>
				</FormControl>
				<Stack direction='row' spacing={3} mt='20px' w='100%' justifyContent='flex-end'>
					<Button w='111px' h='32px' border='1px solid black' bgColor='white' borderRadius={8} onClick={() => setOpen(!open)}>
						<Text fontWeight={700}>Cancel</Text>
					</Button>
					<Button w='111px' h='32px' bgColor='#47B960' isLoading={isLoading} borderRadius={8} type='submit'>
						<Text color='white' fontWeight={700}>Save</Text>
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}