import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ChakraLink: FC<LinkProps> = props => (
	<Link as={NextLink} {...props} />
);
