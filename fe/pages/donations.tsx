import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React from "react";
import { AikuHead } from "../components/AikuHead";
import Link from "next/link";

// This page explains that donations to the site go to supporting aiku. 1 eur pays for ~100 poems.
const Donations: NextPage = () => {
  return (
    <div className={styles.container}>
      <AikuHead canonical={"/donations"} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div className={styles.donate}>
            <Link href="/">Aiku</Link>
          </div>
        </h1>

        <h2>Donate to Aiku.</h2>

        <p>
          Aiku is a free service that helps you write haiku. It is free to use,
          but donations help to keep it up and running.
        </p>

        <p>Just 1 euro (€) will pay for 100 poems.</p>
        <p>You can donate to Aiku by clicking the link below.</p>

        <p className={styles.donate}>
          <a href="https://buy.stripe.com/14k4ifalecFH0cUeUV">Donate</a>
        </p>

        <p className={styles.donate}>
          Please get in touch with us on{" "}
          <a href="https://twitter.com/aikuthepoet">Twitter</a> if you have any
          questions or want a refund.
        </p>
      </main>
    </div>
  );
};

export default Donations;
