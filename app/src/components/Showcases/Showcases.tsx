import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Category } from './Category';

export const Showcases: FC = () => {
	const categories = [
		{
			name: 'Electronics',
			image: 'https://i.imgur.com/pmqesVq.png',
		},
		{
			name: 'Utilities',
			image: 'https://i.imgur.com/4CaVFrC.png',
		},
		{
			name: 'Home Appliances',
			image: 'https://i.imgur.com/6o8FgLH.png',
		},
		{
			name: 'Shoes',
			image: 'https://i.imgur.com/L4vb2eq.png',
		},
		{
			name: 'Fashion',
			image: 'https://i.imgur.com/stNy6MJ.png',
		},
		{
			name: 'Cosmetics',
			image: 'https://i.imgur.com/Jjekc4u.png',
		},
	];

	return (
		<Flex flexDir="row" gap="2" flexDirection="column" px="6" overflow="hidden">
			<Text color="gray.700" fontSize="lg" fontWeight="bold">
				Categories
			</Text>
			<Flex
				flexDir="row"
				gap="4"
				overflowX="scroll"
				sx={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				}}
			>
				{categories.map((category, index) => (
					<Category key={+index} name={category.name} image={category.image} />
				))}
			</Flex>
		</Flex>
	);
};
