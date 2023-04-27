import { Stack, FormControl, FormLabel, Input, Textarea, Text, Flex, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { usePosts } from "../../../hooks/usePosts";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/auth-slice";
import { env } from "../../../utils/env";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export function CardNewPost() {
	const toast = useToast();
	const { register, handleSubmit, reset } = useForm();
	const { getInfo } = useLocalStorage();
	const { create } = usePosts();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState(false);
	const createPost = async (data: any) => {
		setLoading(true);
		try{
			const username = getInfo(env.localStorageKey);
			if(!username || username === ''){
				toast({
					title: 'Not allowed to complete this action.',
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'top-right'
				});
				dispatch(authActions.logout());
				navigate('/');
				return;
			}
			await create({ ...data, username });
			toast({
				title: 'Post created!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
			reset();
		}catch(e: unknown){
			toast({
				title: 'Was not possible complete this action.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
		}
		setLoading(false);
	}
	return (
		<Stack spacing={4} border='1px solid #999' w='100%' minH='334px' borderRadius={16} p='24px'>
			<Text fontSize='22px' fontWeight={700} fontFamily='Roboto'>What's on your mind?</Text>
			<form onSubmit={handleSubmit(createPost)}>
				<FormControl fontFamily='Roboto'>
					<FormLabel fontSize='16px'>Title</FormLabel>
					<Input {...register('title', { required: true })} placeholder='Hello world' w='100%' />
					<FormLabel mt='10px'>Content</FormLabel>
					<Textarea {...register('content', { required: true })} placeholder="Content here" resize='none' w='100%' h='74px'></Textarea>
				</FormControl>
				<Flex mt='20px' w='100%' justifyContent='flex-end'>
					<Button isLoading={isLoading} w='111px' minH='32px' bgColor='#7695EC' borderRadius={8} type='submit'>
						<Text color='white' fontWeight={700}>Create</Text>
					</Button>
				</Flex>
			</form>
		</Stack>
	);
}