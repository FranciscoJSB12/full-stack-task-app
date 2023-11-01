import styles from "@/styles/FetchError.module.css";

export function FetchError () {
    return (
        <main className={styles.FetchErrorMain}>
          <p className={styles.FetchErrorText}>Failed to fetch data</p>
        </main>
    );
}