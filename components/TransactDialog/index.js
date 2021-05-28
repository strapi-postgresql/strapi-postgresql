import { useState } from "react";
import TransactionCard from "../TransactionCard";
import axios from "axios";

export default function TransactDialog({ closeModal }) {
  const [disable, setDisable] = useState(false);

  async function transact() {
    setDisable(true);
    const sender = window.sender.value;
    const receiver = window.receiver.value;
    const amount = window.amount.value;

    await axios.post("http://localhost:1337/transfer", {
      sender,
      receiver,
      amount,
    });

    setDisable(false);
    closeModal();
    location.reload();
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Transaction</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={closeModal}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="inputField">
              <div className="label">
                <label>Sender</label>
              </div>
              <div>
                <input id="sender" type="text" />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Receiver</label>
              </div>
              <div>
                <input id="receiver" type="text" />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Amount($)</label>
              </div>
              <div>
                <input id="number" id="amount" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            disabled={disable}
            className="btn-danger"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button disabled={disable} className="btn" onClick={transact}>
            Transact
          </button>
        </div>
      </div>
    </div>
  );
}
