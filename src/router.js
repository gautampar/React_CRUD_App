import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BookInput from "./Components/BookInput";
import Table from "./Components/Table";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Table />,
  },
]);

export default router;
