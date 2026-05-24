import { useEffect, useState } from "react";

import { getWallets } from "./api";

export default function Networks() {

  const [wallets, setWallets] =
    useState([]);

  // =====================================
  // LOAD WALLETS
  // =====================================

  useEffect(() => {

    loadWallets();

  }, []);

  const loadWallets = async () => {

    try {

      const response =
        await getWallets();

      if (response.success) {

        setWallets(

          response.wallets

        );

      }

    }

    catch (error) {

      console.log(error);

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
        Connected Wallets
      </h2>

      {wallets.length === 0 ? (

        <p
          style={{
            color: "#888"
          }}
        >
          No wallets connected.
        </p>

      ) : (

        wallets.map((wallet) => (

          <div
            key={wallet._id}
            style={{
              background: "#111111",
              padding: "15px",
              borderRadius: "14px",
              marginBottom: "15px",
              border: "1px solid #222"
            }}
          >

            <p
              style={{
                color: "#A855F7",
                wordBreak: "break-all",
                fontWeight: "bold"
              }}
            >
              {wallet.walletAddress}
            </p>

            <p
              style={{
                color: "#888",
                marginTop: "10px"
              }}
            >
              {wallet.network}
            </p>

          </div>

        ))

      )}

    </div>

  );

}
