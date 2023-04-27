import { Flex, Stack, Text, Input, Button, Box, useToast } from "@chakra-ui/react";
import { Wrapper } from "../../components/Wrapper";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from "../../redux/auth-slice";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../redux/user-slilce";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { env } from "../../utils/env";
import store from "../../redux/store";

export function SignUp () {
	const [username, setUsername] = useState<string>('');
	const { sign } = useLocalStorage();
	const navigate = useNavigate();
	const toast = useToast();
	const dispatch = useDispatch();
	const signup = () => {
		if(username.length === 0){
			toast({
				title: 'You must to enter with a username',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
			return;
		}
		dispatch(authActions.login());
		dispatch(userActions.setUsername({ username }));
		toast({
			title: 'Welcome to network!',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top-right'
		});
		sign(env.localStorageKey, username);
		navigate('/home');
	}
	useEffect(() => {
		if (store.getState().auth.isLoggedIn) navigate('/home');
	}, []);
	return (
		<Wrapper options={{ justifyContent: 'center', alignItems: 'center', w: '100vw', h: '100vh', bgColor:'#DDD' }}>
			<Stack spacing={5} direction='column' w={['90%', '90%', '700px', '700px']} minH='220px' bgColor='white' border='1px solid #CCC' p='24px' borderRadius={16}>
				<Text fontWeight={700} fontSize={['19px', '20px', '22px', '22px']}>Welcome to CodeLeap network!</Text>
				<Box mt='26px'>
					<Text fontSize='16px' fontWeight={400}>Please enter your username</Text>
					<Input placeholder='Ex.: John Doe' type='text' onChange={({ target }) => setUsername(target.value)} name='username' w='100%' border='1px solid rgba(120, 120, 120, 0.8)' />
				</Box>
				<Flex mt='20px' w='100%' justifyContent='flex-end'>
					<Button w='111px' minH='32px' bgColor='#7695EC' borderRadius={8} onClick={signup}>
						<Text color='white' fontWeight={700}>ENTER</Text>
					</Button>
				</Flex>
			</Stack>
		</Wrapper>
	);
}