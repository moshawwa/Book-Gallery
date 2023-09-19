import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}></RouterProvider>
    </PersistGate>
  </Provider>
);
