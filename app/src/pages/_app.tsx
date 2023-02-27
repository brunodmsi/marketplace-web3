import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorHandler, WagmiWrapper } from '@/containers';

const queryClient = new QueryClient();

const MyApp = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) => (
	<>
		<Head>
			{/* Primary Meta Tags */}
			<title>Marketplace Web3</title>
			<meta name="title" content="Marketplace Web3" />
			<meta name="description" content="Your money, any time." />
			<link rel="icon" href="/favicon.png" />

			{/* Open Graph / Facebook */}
			<meta property="og:url" content="https://cali.finance" key="ogurl" />
			<meta property="og:image" content="/meta/default.png" key="ogimage" />
			<meta
				property="og:site_name"
				content="Marketplace Web3"
				key="ogsitename"
			/>
			<meta property="og:title" content="Marketplace Web3" key="ogtitle" />
			<meta
				property="og:description"
				content="Your money, any time."
				key="ogdesc"
			/>

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://cali.finance" />
			<meta property="twitter:title" content="Marketplace Web3" />
			<meta property="twitter:description" content="Your money, any time." />
			<meta property="twitter:image" content="/meta/default.png" />
		</Head>
		<WagmiWrapper>
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={session}>
					<ColorHandler cookies={pageProps.cookies}>
						<Component {...pageProps} />
					</ColorHandler>
				</SessionProvider>
			</QueryClientProvider>
		</WagmiWrapper>
	</>
);

export default MyApp;
