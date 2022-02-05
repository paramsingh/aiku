import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { getPoem } from '../helpers/api'

const Home: NextPage = () => {
  const [poem, setPoem] = useState<string>('');
  const [word1, setWord1] = useState<string>('');
  const [word2, setWord2] = useState<string>('');
  return (
    <div className={styles.container}>
      <Head>
        <title>Aiku: The AI Haiku writer</title>
        <meta name="description" content="An AI that can write poems for you." />
        <link rel="icon" href="/favicon.ico" />
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
              <input className={styles.input} type="text" placeholder="First word" onChange={(event) => setWord1(event.target.value)}/>
            </div>
            <div style={{marginRight: 10}}>
            <input className={styles.input} type="text" placeholder="Second word" onChange={(event) => setWord2(event.target.value)}/>
            </div>
            <div>
              <button className={styles.button} onClick={(e) => {
                e.preventDefault();
                getPoem(word1, word2, setPoem);
              }}>Generate haiku</button>
            </div>
        </div>

        <div className={styles.card}>{poem || "No poem yet!"}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://param.codes"
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
