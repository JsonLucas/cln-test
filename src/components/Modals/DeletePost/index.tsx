import { Stack, Text, Button, useToast } from "@chakra-ui/react";
import { usePosts } from "../../../hooks/usePosts";
import { useState } from 'react';

interface Props{
	open: boolean,
	setOpen: (param: boolean) => void,
	postId: number
}

export function ModalDeletePost({ open, setOpen, postId }: Props) {
	const { remove } = usePosts();
	const [isLoading, setLoading] = useState(false);
	const toast = useToast();
	const deletePost = async () => {
		setLoading(true);
		try{
			await remove(postId);
			toast({
				title: 'Postagem removido com sucesso!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
			setOpen(false);
		}catch(e: unknown){
			toast({
				title: 'Não foi possível remover a postagem.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top-right'
			});
		}
		setLoading(false);
	}
	return (
		<Stack spacing={5} direction='column' w={['95%', '460px', '660px', '660px']} p='24px' bgColor='white' borderRadius={16}>
			<Text size='22px' fontWeight={700}>Are you sure you want to delete this item?</Text>
			<Stack direction='row' spacing={4} w='100%' justifyContent='flex-end'>
				<Button cursor='pointer' w='120px' minH='32px' border='1px solid #999' fontWeight={700} onClick={() => setOpen(!open)}>Cancel</Button>
				<Button cursor='pointer' w='120px' minH='32px' isLoading={isLoading} bgColor='#FF5151' color='white' fontWeight={700} onClick={deletePost}>Delete</Button>
			</Stack>
		</Stack>
	);
}