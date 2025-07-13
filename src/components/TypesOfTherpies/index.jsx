
import styles from "./index.module.css";

export default function TypesOfTherpies() {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Therapy For A Better Life</h1>
      <p className={styles.description}>
        What type of therapy are you looking for?
      </p>



      {/* Therapy Type Cards */}
      <div className={styles.cards}>
        {/* First-Time Assessment */}
        <div className={`${styles.card} ${styles.lightBlue}`}>
          <h3 className={styles.cardTitle}>First-Time Assessment</h3>
          <div className={styles.icon}>🩺</div>
          <p className={styles.cardDescription}>
            Start with a 25-minute session to understand your needs. A licensed
            therapist will guide you on what’s best for you next.
          </p>
          <button className={styles.price}>₹500 / session</button>
        </div>

        {/* One-on-One Therapy */}
        <div className={`${styles.card} ${styles.lightGreen}`}>
          <h3 className={styles.cardTitle}>One-on-One Therapy</h3>
          <div className={styles.icon}>📅</div>
          <p className={styles.cardDescription}>
            Already know what you need? Book a session directly with a certified
            therapist.
          </p>
          <button className={styles.price}>₹1000 / session</button>
        </div>

        {/* Guided Therapy Plan */}
        <div className={`${styles.card} ${styles.lightYellow}`}>
          <h3 className={styles.cardTitle}>Guided Therapy Plan</h3>
          <div className={styles.icon}>📈</div>
          <p className={styles.cardDescription}>
            Continue your healing journey with structured therapy sessions
            recommended by your therapist.
          </p>
          <button className={styles.price}>₹1000 / session • 3–10 sessions</button>
        </div>

        {/* Teen Therapy */}
        <div className={`${styles.card} ${styles.lightPeach}`}>
          <h3 className={styles.cardTitle}>Teen Therapy (Under 18)</h3>
          <div className={styles.icon}>🔞</div>
          <p className={styles.cardDescription}>
            If you’re under 18, this is the right place. Connect with our teen
            therapy team for safe and supportive care.
          </p>
          <button className={styles.price}>Parental consent required</button>
        </div>
      </div>
    </div>
  );
}
