import { Flex, FlexProps } from "@chakra-ui/react";

interface Props{
	children: JSX.Element
	options?: FlexProps
}

export function Wrapper({ children, options }: Props){
	return (
		<Flex {...options} fontFamily='Roboto'>
			{children}
		</Flex>
	);
}