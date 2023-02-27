import { Flex, Text, Img, IconButton, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import { ChakraLink } from '../ChakraLink';

export const Footer: FC = () => {
	const socialMedias = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/',
			icon: BsFacebook,
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/',
			icon: AiFillTwitterCircle,
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/',
			icon: RiInstagramFill,
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/',
			icon: AiFillLinkedin,
		},
	];
	return (
		<Flex
			bgColor="gray.900"
			w="full"
			gap="4"
			justify="center"
			align="center"
			py="4"
			px="4"
		>
			{socialMedias.map((socialMedia, index) => (
				<ChakraLink href={socialMedia.url} key={+index} isExternal>
					<IconButton
						aria-label={`${socialMedia.name} icon`}
						borderRadius="full"
						background="transparent"
						_hover={{}}
						_active={{}}
						_focus={{}}
						_focusWithin={{}}
						_focusVisible={{}}
						boxSize="8"
						icon={
							<Icon
								as={socialMedia.icon}
								color="white"
								borderRadius="full"
								boxSize="8"
							/>
						}
					/>
				</ChakraLink>
			))}
		</Flex>
	);
};
