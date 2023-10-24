import styles from "@/styles/FetchError.module.css";

export function FetchError () {
    return (
        <main className={styles.main}>
          <p className={styles.p}>Failed to fetch data</p>
        </main>
    );
}