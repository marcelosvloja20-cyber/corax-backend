const API_URL =
  "https://corax-backend.onrender.com";

// =====================================
// REGISTER
// =====================================

export async function registerUser(

  username,
  email,
  password

) {

  const response =
    await fetch(

      `${API_URL}/auth/register`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          username,
          email,
          password

        })

      }

    );

  return response.json();

}

// =====================================
// LOGIN
// =====================================

export async function loginUser(

  email,
  password

) {

  const response =
    await fetch(

      `${API_URL}/auth/login`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          email,
          password

        })

      }

    );

  return response.json();

}

// =====================================
// GET USER
// =====================================

export async function getCurrentUser() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(

      `${API_URL}/users/me`,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  return response.json();

}

// =====================================
// SAVE WALLET
// =====================================

export async function saveWallet(

  walletAddress,
  network

) {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(

      `${API_URL}/wallet/create`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`

        },

        body: JSON.stringify({

          walletAddress,
          network

        })

      }

    );

  return response.json();

}

// =====================================
// GET WALLETS
// =====================================

export async function getWallets() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(

      `${API_URL}/wallet/my-wallets`,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  return response.json();

}
