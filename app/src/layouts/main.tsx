import { Footer, Header } from '@/components';
import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface IMainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
	return (
		<Flex flexDirection="column" minH="100vh">
			<Header />
			<Flex as="main" flex="1" flexDirection="column">
				{children}
			</Flex>
			<Footer />
		</Flex>
	);
};
