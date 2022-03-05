import Head from "next/head";


const AikuHead = () => {
    return (
    <Head>
        <title>Aiku: The AI Haiku writer</title>
        <meta name="description" content="An AI that can write poems for you." />
        <link rel="icon" href="/logo.ico" />
        <script data-goatcounter="https://aiku.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
      </Head>
    );
}

export { AikuHead };
