import { NavBar } from "../shared/components/NavBar";
import { CarrierReport } from "./CarrierReport";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route index element={<CarrierReport />} />
      </Routes>
    </Router>
  );
}
