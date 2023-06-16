import {BrowserRouter, Route, Routes} from "react-router-dom";
import BrokersPage from "./pages/brokers-page.js";
import SharesListPage from "./pages/shares-list-page";
import SettingsPage from "./pages/settings-page";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/settings" element={<SettingsPage />}/>
              <Route path="/brokers" element={<BrokersPage />}/>
              <Route path="/" element={<SharesListPage />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
