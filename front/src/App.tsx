import { BrowserRouter } from "react-router-dom";
import './index.css'
import Layout from "./layout/Layout";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
   <MantineProvider>
     <Notifications />
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
</MantineProvider>

  );
}

export default App;
