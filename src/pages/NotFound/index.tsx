import { Stack, Text, Flex } from "@chakra-ui/react";
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

export function NotFound() {
	const navigate = useNavigate();
	return (
		<Stack direction='column' position='fixed' h='100vh' w='100vw' justifyContent='center' alignItems='center' bgColor='#DDD'>
			<Text fontWeight={700} fontSize='32px'>Page not found!</Text>
			<Flex alignItems='center' cursor='pointer' onClick={() => navigate('/')}>
				<IoIosArrowBack  />
				<Text>Click here to back.</Text>
			</Flex>
		</Stack>
	);
}