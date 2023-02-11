import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getPoem } from "../helpers/api";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import randomWords from "random-words";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { AikuHead } from "../components/AikuHead";
import Link from "next/link";
import Image from "next/image";
import AikuImage from "../public/aiku.png";

const MAX_WORD_LENGTH = 50;

const useUniqueWord = () => {
  const [word, setWord] = useState<string>("");

  useEffect(() => {
    const randomWord = randomWords(1);
    setWord(randomWord[0]);
  }, []);

  return [word, setWord as any];
};
const Home: NextPage = () => {
  const [poem, setPoem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [word1, setWord1] = useUniqueWord();
  const [word2, setWord2] = useUniqueWord();

  const [copied, setCopied] = useState<boolean>(false);

  const onWordInput = (e: any, fn: (s: string) => void): void => {
    e.preventDefault();
    const word = e.target.value.trim();
    fn(e.target.value);
  };

  const validateWords = (word1: string, word2: string): boolean => {
    if (word1.length == 0 || word2.length == 0) {
      alert("Please enter two words");
      return false;
    }

    for (let word of [word1, word2]) {
      if (word.split(" ").length != 1) {
        // TODO:  alerting for now, will have to fix this up.
        alert(
          "Multiple words in one input are not allowed, please enter a single word"
        );
        return false;
      }

      if (word.length > MAX_WORD_LENGTH) {
        // TODO:  alerting for now, will have to fix this up.
        alert(
          `Word is too long, please enter a shorter word. Each word should be less than ${MAX_WORD_LENGTH} characters`
        );
        return false;
      }
    }

    return true;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateWords(word1, word2)) {
      setLoading(true);
      setCopied(false);
      getPoem(word1, word2, setPoem, setLoading);
    }
  };

  return (
    <div className={styles.container}>
      <AikuHead />
      <main className={styles.main}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: "20px" }}>
            <Image src={AikuImage} height="200px" width="200px" />
          </div>
          <h1 className={styles.title}>Aiku</h1>
        </div>
        <p className={styles.description}>
          Give Aiku two words as a prompt and it will write you a haiku-like
          poem. Follow Aiku on{" "}
          <Link href="https://social.param.codes/@aiku">
            <a>Mastodon</a>
          </Link>{" "}
          to see all the poems generated here.
        </p>
        <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
          <div className={styles.grid}>
            <InputGroup style={{ marginBottom: "10px" }}>
              <FormControl
                size="lg"
                placeholder={word1}
                onChange={(event) => onWordInput(event, setWord1)}
              />
            </InputGroup>
            <InputGroup style={{ marginBottom: "20px" }}>
              <FormControl
                size="lg"
                placeholder={word2}
                onChange={(event) => onWordInput(event, setWord2)}
              />
            </InputGroup>
            <Button className={styles.button} type="submit" onClick={onSubmit}>
              Generate poem
            </Button>
          </div>
        </form>

        <Card bg="light" style={{ marginBottom: "20px" }}>
          <Card.Body style={{ whiteSpace: "pre-line" }}>
            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              poem || "No poem yet!"
            )}
          </Card.Body>
        </Card>

        <Card className="text-center" style={{ marginBottom: "20px" }}>
          <Card.Header>Share this poem</Card.Header>
          <Card.Body>
            <Button
              className={styles.copy}
              onClick={() => {
                if (copied) return;
                navigator.clipboard
                  .writeText(poem)
                  .then(() => {
                    setCopied(true);
                  })
                  .catch(() => console.log("error while copying"));
              }}
              variant="secondary"
            >
              <FontAwesomeIcon
                icon={copied ? faCheck : faClipboard}
                size={"xs"}
              ></FontAwesomeIcon>
            </Button>
            <TwitterShareButton
              className={styles.share}
              title={poem}
              url={`\n\n - @aikuthepoet on "${word1}" and "${word2}" (https://aiku.param.codes)`}
            >
              <TwitterIcon size={32} />
            </TwitterShareButton>
            <FacebookShareButton
              className={styles.share}
              quote={`${poem} - \n\n Aiku on "${word1}" and "${word2}" (https://aiku.param.codes)`}
              url={"https://aiku.param.codes"}
            >
              <FacebookIcon size={32} />
            </FacebookShareButton>
            <WhatsappShareButton
              title={poem}
              url={`\n\n - Aiku on "${word1}" and "${word2}" (https://aiku.param.codes)`}
            >
              <WhatsappIcon size={32} />
            </WhatsappShareButton>
          </Card.Body>
        </Card>
        <p className={styles.donate}>
          <Link href="/donations">
            Support this site by paying! €1 pays for ~100 poems.
          </Link>
        </p>
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
  );
};

export default Home;
