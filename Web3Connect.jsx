import { useState } from "react";

import { saveWallet } from "./api";

export default function Web3Connect() {

  const [wallet, setWallet] =
    useState("");

  const [status, setStatus] =
    useState("");

  // =====================================
  // CONNECT WALLET
  // =====================================

  const connectWallet = async () => {

    try {

      // CHECK METAMASK

      if (!window.ethereum) {

        setStatus(

          "MetaMask not installed"

        );

        return;

      }

      // REQUEST ACCOUNT

      const accounts =
        await window.ethereum.request({

          method:
            "eth_requestAccounts"

        });

      const address =
        accounts[0];

      setWallet(address);

      // SAVE DATABASE

      const response =
        await saveWallet(

          address,
          "Ethereum"

        );

      if (response.success) {

        setStatus(

          "Wallet connected successfully"

        );

      }

      else {

        setStatus(

          "Wallet save failed"

        );

      }

    }

    catch (error) {

      console.log(error);

      setStatus(

        "Connection failed"

      );

    }

  };

  return (

    <div
      style={{
        marginTop: "30px",
        background: "#050505",
        padding: "20px",
        borderRadius: "20px",
        border: "1px solid #222"
      }}
    >

      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        Web3 Wallet
      </h2>

      <button
        onClick={connectWallet}
        style={{
          width: "100%",
          padding: "14px",
          background: "#A855F7",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Connect MetaMask
      </button>

      {wallet && (

        <div
          style={{
            marginTop: "20px"
          }}
        >

          <p
            style={{
              color: "#22C55E",
              wordBreak: "break-all"
            }}
          >
            {wallet}
          </p>

        </div>

      )}

      {status && (

        <p
          style={{
            marginTop: "15px",
            color: "#888"
          }}
        >
          {status}
        </p>

      )}

    </div>

  );

}
