import { Categories, Showcases } from '@/components';
import { MainLayout } from '@/layouts';
import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

export const HomeContainer: FC = () => {
	return (
		<MainLayout>
			<Flex bgColor="white" flex="1" py="8" px="4">
				<Categories />
			</Flex>
		</MainLayout>
	);
};
