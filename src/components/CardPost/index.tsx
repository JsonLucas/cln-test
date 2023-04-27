import { Stack, Text, Flex, Box } from "@chakra-ui/react";
import { IoIosTrash, IoIosCreate } from 'react-icons/io';
import { useState } from 'react';
import { Wrapper } from "../Wrapper";
import { ModalDeletePost } from "../Modals/DeletePost";
import { ModalUpdatePost } from "../Modals/UpdatePost";
import { IPost } from "../../interfaces/post";
import dayjs from 'dayjs';
import store from "../../redux/store";

interface Props {
	post: IPost
}

export function CardPost({ post }: Props) {
	const [openDelete, setOpenDelete] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	return (
		<>
			<Stack spacing={4} border='1px solid #999' w='100%' minH='334px' mt='20px' borderRadius={16}>
				<Flex p='24px' w='100%' justifyContent='space-between' alignItems='center' bgColor='#7695EC' borderRadius='16px 16px 0px 0px'>
					<Text color='white' fontSize='22px' maxW={['100%', '75%', '60%', '50%']} fontWeight={700} fontFamily='Roboto' textOverflow='ellipsis'>{post.title}</Text>
					{post.username === store.getState().username.username &&
						<Stack direction='row' spacing={4}>
							<IoIosTrash style={{ cursor: 'pointer' }} color='white' size={30} onClick={() => setOpenDelete(!openDelete)} />
							<IoIosCreate style={{ cursor: 'pointer' }} color='white' size={30} onClick={() => setOpenUpdate(!openUpdate)} />
						</Stack>
					}
				</Flex >
				<Box p='24px' w='100%'>
					<Flex w='100%' justifyContent='space-between' alignItems='center'>
						<Text fontWeight={700} fontSize={['15px', '18px', '18px', '18px']} color='#777'>@{post.username}</Text>
						<Text fontWeight={400} fontSize={['15px', '18px', '18px', '18px']} color='#777'>{dayjs(post.created_datetime).format('DD/MM/YYYY HH:mm')}</Text>
					</Flex>
					<Box mt='16px' w='100%'>
						<Text fontSize={['15px', '18px', '18px', '18px']} fontWeight={400}>
							{post.content}
						</Text>
					</Box>
				</Box>
			</Stack >
			{openDelete &&
				<Wrapper options={{ position: 'fixed', top: 0, left: 0, alignItems: 'center', justifyContent: 'center', minW: '100%', minH: '100%', bgColor: 'rgba(119, 119, 119, 0.8)' }}>
					<ModalDeletePost open={openDelete} setOpen={setOpenDelete} postId={post.id} />
				</Wrapper>
			}
			{
				openUpdate &&
				<Wrapper options={{ position: 'fixed', top: 0, left: 0, alignItems: 'center', justifyContent: 'center', minW: '100%', minH: '100%', bgColor: 'rgba(119, 119, 119, 0.8)' }}>
					<ModalUpdatePost open={openUpdate} setOpen={setOpenUpdate} post={post} />
				</Wrapper>
			}
		</>
	);
}