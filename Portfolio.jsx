export default function Portfolio() {

  const assets = [

    {
      symbol: "CRX",
      balance: "12,500",
      value: "$8,750"
    },

    {
      symbol: "ETH",
      balance: "1.25",
      value: "$4,200"
    },

    {
      symbol: "USDT",
      balance: "2,800",
      value: "$2,800"
    },

    {
      symbol: "MATIC",
      balance: "950",
      value: "$640"
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
        Portfolio Overview
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px"
        }}
      >

        {

          assets.map((asset, index) => (

            <div
              key={index}
              style={{
                background: "#111111",
                padding: "18px",
                borderRadius: "14px",
                border: "1px solid #222",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <div>

                <h3
                  style={{
                    color: "#A855F7",
                    marginBottom: "5px"
                  }}
                >
                  {asset.symbol}
                </h3>

                <p
                  style={{
                    color: "#888"
                  }}
                >
                  Balance: {asset.balance}
                </p>

              </div>

              <div
                style={{
                  color: "#22C55E",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                {asset.value}
              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}
