import { createRoot } from "react-dom/client";
import "../node_modules/flowbite/dist/flowbite.js";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import UserTokenProvider from "./context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CarContext.jsx";
import { WishProvider } from "./context/WishContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserTokenProvider>
      <CartProvider>
      <WishProvider>
        <Toaster></Toaster>
        <App />
      </WishProvider>
      </CartProvider>
    </UserTokenProvider>
  </QueryClientProvider>
);
