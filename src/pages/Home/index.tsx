import { CardPost } from "../../components/CardPost";
import { CardNewPost } from "../../components/CardPost/NewPost";
import { Wrapper } from "../../components/Wrapper";
import { Box, Text, Stack, Spinner, Flex, Center, useToast } from "@chakra-ui/react";
import { usePosts } from "../../hooks/usePosts";
import { IPost } from "../../interfaces/post";
import { IoIosExit } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { env } from "../../utils/env";
import { authActions } from "../../redux/auth-slice";
import { useEffect } from 'react';
import store from "../../redux/store";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function Home() {
	const { posts } = usePosts();
	const toast = useToast();
	const { remove } = useLocalStorage();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const logout = () => {
		dispatch(authActions.logout());
		toast({
			title: 'Logout successfuly.',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top-right'
		});
		remove(env.localStorageKey);
		navigate('/');
	}
	useEffect(() => {
		if (!store.getState().auth.isLoggedIn) {
			navigate('/');
		}
	}, []);
	return (
		<Wrapper options={{ justifyContent: 'center', minW:'100vw', minH: '100vh', bgColor:'#DDD' }}>
			<Stack direction='column' w={['100%', '600px', '700px', '800px']} minH='100vh' bgColor='white'>
				<Flex w='100%' bgColor='#7695EC' p='27px' justifyContent='space-between' alignItems='center'>
					<Text fontWeight={700} ml='10px' fontSize='22px' color='white' fontFamily='Roboto'>CodeLeap Nextwork</Text>
					<Flex cursor='pointer' onClick={logout}>
						<Text fontWeight={700} fontSize='18px' color='white'>Logout</Text>
						<IoIosExit size={25} color='white' />
					</Flex>
				</Flex>
				<Box w='100%' bgColor='white' p='24px'>
					<CardNewPost />
					{posts.isLoading && <Center mt='20px'><Spinner size='lg' /></Center>}
					{posts.data && <>{posts.data.map((item: IPost) => <CardPost key={item.id} post={item} />)}</>}
				</Box>
			</Stack>
		</Wrapper>
	);
}