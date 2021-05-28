import styles from "../../styles/AccountView.module.css";
import { useRouter } from "next/router";
import TransactionCard from "../../components/TransactionCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const [account, setAccount] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(async () => {
    const AccountData = await axios.get("http://localhost:1337/accounts/" + id);
    var transactsData = await axios.get("http://localhost:1337/transacts");
    transactsData = transactsData?.data?.filter(
      (tD) =>
        tD.sender == AccountData?.data?.name ||
        tD.receiver == AccountData?.data?.name
    );
    console.log(transactsData);
    setAccount(AccountData?.data);
    setTransactions(transactsData);
  }, [id]);

  async function deleteAccount() {
    if (confirm("Do you really want to delete this account?")) {
      await axios.delete("http://localhost:1337/accounts/" + id);
      router.push("/");
    }
  }

  return (
    <div className={styles.accountviewcontainer}>
      <div className={styles.accountviewmain}>
        <div style={{ width: "100%" }}>
          <div className={styles.accountviewname}>
            <h1>{account?.name}</h1>
          </div>
          <div className={styles.accountviewminidet}>
            <div>
              <span style={{ marginRight: "4px", color: "rgb(142 142 142)" }}>
                Balance($):
              </span>
              <span style={{ fontWeight: "600" }}>{account?.balance}</span>
            </div>
            <div style={{ padding: "14px 0" }}>
              <span>
                <button onClick={deleteAccount} className="btn-danger">
                  Delete
                </button>
              </span>
            </div>
          </div>
          <div className={styles.accountviewtransactionscont}>
            <div className={styles.accountviewtransactions}>
              <h2>Transactions</h2>
            </div>
            <div className={styles.accountviewtransactionslist}>
              {!transactions || transactions?.length <= 0
                ? "No transactions yet."
                : transactions?.map((transaction, i) => (
                    <TransactionCard key={i} transaction={transaction} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
