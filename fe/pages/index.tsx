import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { getPoem } from '../helpers/api'
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { Button, Card, FormControl, InputGroup, Spinner } from 'react-bootstrap'
import randomWords from 'random-words';
import 'bootstrap/dist/css/bootstrap.min.css';

const MAX_WORD_LENGTH = 50;

const Home: NextPage = () => {
  const [poem, setPoem] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [initialWord1, initialWord2] = randomWords(2);
  const [word1, setWord1] = useState<string>(initialWord1);
  const [word2, setWord2] = useState<string>(initialWord2);

  const onWordInput = (e: any, fn: (s: string) => void): void => {
    e.preventDefault();
    const word = e.target.value.trim();
    fn(e.target.value);
  }

  const validateWords = (word1: string, word2: string): boolean => {
    if (word1.length == 0 || word2.length == 0) {
      alert("Please enter two words");
      return false;
    }

    for (let word of [word1, word2]) {
      if (word.split(" ").length != 1) {
        // TODO:  alerting for now, will have to fix this up.
        alert("Multiple words in one input are not allowed, please enter a single word");
        return false;
      }

      if (word.length > MAX_WORD_LENGTH) {
        // TODO:  alerting for now, will have to fix this up.
        alert(`Word is too long, please enter a shorter word. Each word should be less than ${MAX_WORD_LENGTH} characters`);
        return false;
      }
    }

    return true;
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateWords(word1, word2)) {
      setLoading(true);
      getPoem(word1, word2, setPoem, setLoading);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Aiku: The AI Haiku writer</title>
        <meta name="description" content="An AI that can write poems for you." />
        <link rel="icon" href="/logo.ico" />
        <script data-goatcounter="https://aiku.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Aiku
        </h1>
        <p className={styles.description}>
          Give Aiku two words as a prompt and it will write you a haiku-like poem.
        </p>
        <form onSubmit={onSubmit} style={{marginBottom: '20px'}}>
          <div className={styles.grid}>
            <InputGroup style={{marginBottom: '10px'}}>
              <FormControl
                size="lg"
                placeholder={word1}
                onChange={(event) => onWordInput(event, setWord1)}
              />
            </InputGroup>
            <InputGroup style={{marginBottom: '20px'}}>
              <FormControl
                size="lg"
                placeholder={word2}
                onChange={(event) => onWordInput(event, setWord2)}
              />
            </InputGroup>
            <Button className={styles.button} type="submit" onClick={onSubmit}>Generate poem</Button>
        </div>
      </form>

      <Card bg="light" style={{marginBottom: '20px'}}>
        <Card.Body style={{whiteSpace: "pre-line"}}>
          {loading ? <Spinner animation="border" variant="primary" /> : (poem || "No poem yet!")}
        </Card.Body>
      </Card>

    <Card className="text-center" style={{marginBottom: "20px"}}>
      <Card.Header>Share this poem</Card.Header>
      <Card.Body>
        <TwitterShareButton className={styles.share} title={poem} url={`\n\n - Aiku on "${word1}" and "${word2}" (https://aiku.param.codes)`}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton className={styles.share} quote={`${poem} - \n\n Aiku on "${word1}" and "${word2}" (https://aiku.param.codes)`} url={'https://aiku.param.codes'}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <WhatsappShareButton title={poem} url={`\n\n - Aiku on "${word1}" and "${word2}" (https://aiku.param.codes)`}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </Card.Body>
    </Card>
        <p className={styles.donate}><a href="https://buy.stripe.com/14k4ifalecFH0cUeUV" target="_blank" rel="noreferrer noopener">Support this site by paying! €1 pays for ~100 poems.</a></p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/iliekcomputers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Param.
        </a>
      </footer>
    </div>
  )
}

export default Home
