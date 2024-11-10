import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Headers.jsx"; // Make sure to import the Header component
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "ACCESS_PUBLIC_KEY",
          "SIGN_TRANSACTION",
          "DISPATCH",
        ],
        ensurePermissions: true,
      }}
      theme={{
        displayTheme: "light",
      }}
    >
      <Header /> {/* Display the Header component */}
      <App /> {/* Render the App component here */}
      <Footer />
    </ArweaveWalletKit>
  </StrictMode>
);
