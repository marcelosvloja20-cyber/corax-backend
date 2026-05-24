export default function Transactions() {

  const transactions = [

    {
      type: "Swap",
      asset: "ETH → CRX",
      amount: "0.5 ETH",
      status: "Completed"
    },

    {
      type: "Stake",
      asset: "CRX",
      amount: "250 CRX",
      status: "Active"
    },

    {
      type: "Transfer",
      asset: "USDT",
      amount: "120 USDT",
      status: "Completed"
    }

  ];

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
        Recent Transactions
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px"
        }}
      >

        {

          transactions.map((tx, index) => (

            <div
              key={index}
              style={{
                background: "#111111",
                padding: "18px",
                borderRadius: "14px",
                border: "1px solid #222"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px"
                }}
              >

                <h3
                  style={{
                    color: "#A855F7"
                  }}
                >
                  {tx.type}
                </h3>

                <p
                  style={{
                    color: "#22C55E"
                  }}
                >
                  {tx.status}
                </p>

              </div>

              <p
                style={{
                  color: "#888",
                  marginBottom: "5px"
                }}
              >
                {tx.asset}
              </p>

              <p
                style={{
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                {tx.amount}
              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}
