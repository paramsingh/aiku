import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { getPoem } from '../helpers/api'
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappShareButton, WhatsappIcon } from 'react-share';

const MAX_WORD_LENGTH = 50;

const Home: NextPage = () => {
  const [poem, setPoem] = useState<string>('');
  const [word1, setWord1] = useState<string>('');
  const [word2, setWord2] = useState<string>('');

  const onWordInput = (e: any, fn: (s: string) => void): void => {
    e.preventDefault();
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Aiku: The AI Haiku writer</title>
        <meta name="description" content="An AI that can write poems for you." />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Aiku
        </h1>

        <p className={styles.description}>
          Give Aiku two words as a prompt and it will write you a haiku-like poem.
        </p>

        <div className={styles.grid}>
            <div style={{marginRight: 10}}>
              <input
                className={styles.input}
                type="text"
                placeholder="First word"
                onChange={(event) => onWordInput(event, setWord1)}
              />
            </div>
            <div style={{marginRight: 10}}>
              <input
                className={styles.input}
                type="text"
                placeholder="Second word"
                onChange={(event) => onWordInput(event, setWord2)}
              />
            </div>
            <div>
              <button className={styles.button} onClick={(e) => {
                e.preventDefault();
                if (validateWords(word1, word2)) {
                  getPoem(word1, word2, setPoem);
                }
              }}>Generate poem</button>
            </div>
        </div>

        <div className={styles.card}>{poem || "No poem yet!"}</div>

        <p className={styles.donate}><a href="https://buy.stripe.com/14k4ifalecFH0cUeUV">Support this site by paying! €1 pays for ~100 poems.</a></p>

        <div className={styles.social}>
          <TwitterShareButton title={poem} url={`\n\n - Aiku (https://aiku.param.codes)`}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <FacebookShareButton quote={poem} url={`\n\n - Aiku (https://aiku.param.codes)`}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton title={poem} url={`\n\n - Aiku (https://aiku.param.codes)`}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>

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
