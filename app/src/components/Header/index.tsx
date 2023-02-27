import {
	Flex,
	Text,
	Icon,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	Button,
	MenuItem,
	IconButton,
	useMediaQuery,
	Input,
} from '@chakra-ui/react';
import { FC } from 'react';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { HiChevronDown } from 'react-icons/hi';
import { ChakraLink } from '../ChakraLink';

const Logo = () => {
	const [isMobile] = useMediaQuery('(max-width: 768px)', {
		ssr: true,
		fallback: true,
	});
	return (
		<ChakraLink href="/">
			<Text
				fontSize={{ base: '2xl', md: '2xl' }}
				fontWeight="bold"
				color="gray.700"
			>
				{isMobile ? 'M3' : 'Marketplace Web3'}
			</Text>
		</ChakraLink>
	);
};

const ProfileContainer = () => {
	return (
		<Menu placement="bottom-end">
			<MenuButton
				as={Button}
				rightIcon={<Icon as={HiChevronDown} color="gray.700" boxSize="6" />}
				px="2"
				py="2"
				h="max-content"
				maxH="max-content"
				minH="max-content"
				bgColor="gray.200"
			>
				<Flex align="center" gap="3">
					<Avatar bgColor="gray.800" boxSize="6" />
					<Text color="gray.800" display={{ base: 'none', md: 'flex' }}>
						Username
					</Text>
				</Flex>
			</MenuButton>
			<MenuList w="max-content" minW="max-content">
				<MenuItem>Profile</MenuItem>
				<MenuItem>Logout</MenuItem>
			</MenuList>
		</Menu>
	);
};

const SearchContainer = () => {
	return (
		<Flex display={{ base: 'none', md: 'flex' }}>
			<Input
				placeholder="Search for products..."
				bgColor="gray.300"
				_placeholder={{
					color: 'gray.600',
				}}
				color="gray.800"
			/>
		</Flex>
	);
};

const CartContainer = () => {
	const notificationsNumber = 0;
	const isTwoDigits = notificationsNumber > 10;
	return (
		<Flex position="relative">
			<IconButton
				aria-label="Shopping Cart"
				icon={<Icon as={RiShoppingCart2Fill} boxSize="6" color="gray.600" />}
				background="transparent"
			/>
			{notificationsNumber > 0 && (
				<Flex
					bgColor="white"
					w="max-content"
					h="max-content"
					p="2px"
					position="absolute"
					right="-1"
					top="-2px"
					borderRadius="full"
				>
					<Text
						fontSize="xs"
						bgColor="red.500"
						h="max-content"
						minW="4"
						w="max-content"
						px="1"
						borderRadius="full"
						color="white"
						textAlign="center"
					>
						{isTwoDigits ? '10+' : notificationsNumber}
					</Text>
				</Flex>
			)}
		</Flex>
	);
};

export const Header: FC = () => {
	return (
		<Flex
			justify="space-between"
			align="center"
			px="6"
			py="4"
			bgColor="white"
			zIndex="banner"
			borderBottom="2px"
			borderBottomColor="gray.200"
			borderBottomStyle="solid"
		>
			<Logo />
			<SearchContainer />
			<Flex align="center" gap="4">
				<CartContainer />
				<ProfileContainer />
			</Flex>
		</Flex>
	);
};
