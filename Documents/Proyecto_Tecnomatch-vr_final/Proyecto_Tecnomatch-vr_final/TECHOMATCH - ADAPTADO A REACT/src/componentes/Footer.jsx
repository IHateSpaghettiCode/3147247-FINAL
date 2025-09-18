import React from "react";
import styles from "../styles/App.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <i className="fas fa-paper-plane"></i>
        <p>
          <strong>CONTACTANOS</strong><br />
          +57 0000000000 <br /> EduMatch@gmail.com
        </p>
      </div>

      <div className={styles.footerSection}>
        <i className="fas fa-heart"></i>
        <p>
          <strong>SIGUENOS</strong><br />
          <i className="fab fa-instagram"></i> @Edumatch <br />
          <i className="fab fa-x-twitter"></i> @Edumatch
        </p>
      </div>

      <div className={styles.footerSection}>
        <i className="fas fa-question-circle"></i>
        <p>
          <strong>ATENCIÓN AL USUARIO</strong><br />
          ProblemasEdu@gmail.com<br />
          +57 0000000000
        </p>
      </div>
    </footer>
  );
}

export default Footer;
