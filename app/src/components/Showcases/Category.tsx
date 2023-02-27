import { Flex, Text, Img } from '@chakra-ui/react';
import { FC } from 'react';

interface ICategoryProps {
	name: string;
	image: string;
}

export const Category: FC<ICategoryProps> = ({ image, name }) => {
	return (
		<Flex w="40" minW="40" h="32" position="relative" boxShadow="lg">
			<Flex
				position="absolute"
				bottom="0"
				w="full"
				sx={{
					background: 'rgba( 255, 255, 255, 0.65)',
					boxShadow: '0 8px 32px 0 rgba( 255, 255, 255, 0.2 )',
					backdropFilter: 'blur(4px)',
					WebkitBackdropFilter: 'blur(4px)',
				}}
				px="2"
				borderBottomRadius="lg"
			>
				<Text
					color="white"
					textAlign="end"
					w="full"
					fontSize="md"
					textShadow="0px 0px 3px rgba(0,0,0,1)"
				>
					{name}
				</Text>
			</Flex>
			<Img src={image} w="full" h="full" objectFit="cover" borderRadius="lg" />
		</Flex>
	);
};
