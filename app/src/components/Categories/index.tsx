import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ChakraLink } from '../ChakraLink';

export const Categories: FC = () => {
	const router = useRouter();
	const categories = [
		{
			name: 'All',
			url: '/',
		},
		{
			name: 'Electronics',
			url: '/categories/electronics',
		},
		{
			name: 'Utilities',
			url: '/categories/utilities',
		},
		{
			name: 'Home Appliances',
			url: '/categories/home-appliances',
		},
		{
			name: 'Shoes',
			url: '/categories/shoes',
		},
		{
			name: 'Fashion',
			url: '/categories/fashion',
		},
		{
			name: 'Cosmetics',
			url: '/categories/cosmetics',
		},
	];

	const isSamePath = (path: string) => {
		return router.pathname.includes(path);
	};

	console.log(router.pathname);

	return (
		<Flex
			overflowX="scroll"
			flexDir="row"
			gap="4"
			w="full"
			h="max-content"
			sx={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			{categories.map((category, index) => (
				<ChakraLink
					key={+index}
					href={category.url}
					h="max-content"
					w="max-content"
				>
					<Text
						fontSize="xl"
						fontWeight="semibold"
						color={isSamePath(category.url) ? 'black' : 'gray.300'}
						h="max-content"
						w="max-content"
					>
						{category.name}
					</Text>
				</ChakraLink>
			))}
		</Flex>
	);
};
