import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Headers.jsx"; // Make sure to import the Header component
import Footer from "./components/Footer.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import { GameProvider } from "./context/GameContext.jsx";
import GameBoardWrapper from "./components/GameBoardWrapper.jsx";


const router = createBrowserRouter ([{
  path: "/",
  element: <App />,
  children: [{
    path: "/",
    element: <LandingPage />
  },{
    path: "/snake-game",
    element: <GameBoardWrapper/>
  }]
}])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider>
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
      
      <RouterProvider router={router}/>
    </ArweaveWalletKit>
    </GameProvider>
  </StrictMode>
);
