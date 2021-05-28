import styles from "./TransactionCard.module.css";

export default function TransactionCard({ transaction }) {
  const { sender, receiver, amount, created_at } = transaction;
  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCardDetails}>
        <div className={styles.transactionCardName}>
          <h4>
            <span>Sender: </span>
            <span style={{ fontWeight: "bold" }}>{sender}</span>
          </h4>
        </div>
        <div className={styles.transactionCardName}>
          <h4>
            <span>Receiver: </span>
            <span style={{ fontWeight: "bold" }}>{receiver}</span>
          </h4>
        </div>
        <div className={styles.transactionCardName}>
          <h4>
            <span>Amount($): </span>
            <span style={{ fontWeight: "bold" }}>{amount}</span>
          </h4>
        </div>
        <div className={styles.transactionCardName}>
          <h4>
            <span>Created At: </span>
            <span style={{ fontWeight: "bold" }}>{created_at}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}
