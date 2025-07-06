import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Routes";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Toaster theme={"dark"} />
      <Router />
    </BrowserRouter>
  </>,
);
