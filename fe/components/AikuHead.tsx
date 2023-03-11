import Head from "next/head";

const AikuHead = ({ canonical = "" }: { canonical?: string }) => {
  return (
    <Head>
      <title>Aiku: The AI Haiku writer</title>
      <meta
        name="description"
        content="Discover Aiku, an artificial intelligence that loves poetry. Aiku can write poems in different forms and genres, from love to horror. Explore https://aiku.param.codes to see what Aiku can do."
      />
      <link rel="icon" href="/logo.ico" />
      <script
        data-goatcounter="https://aiku.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>
      <link rel="canonical" href={`https://aiku.param.codes/${canonical}`} />
    </Head>
  );
};

export { AikuHead };
