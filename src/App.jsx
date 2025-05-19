import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Bikes from "./pages/Bikes";
import AllBookings from "./pages/AllBookings";
import BikeServices from "./pages/BikeServices/BikeServices";
import BikeSpareParts from "./pages/BikeSpareParts/BikeSpareParts";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="allBikes" element={<Bikes />}></Route>
          <Route path="allBookings" element={<AllBookings />}></Route>
          <Route path="bikeservices" element={<BikeServices />}></Route>
          <Route path="bikespareparts" element={<BikeSpareParts />}></Route>
         </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
