import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import {
  getCurrentUser,
} from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home";
import Shop from "./routes/shop/shop";
import Checkout from "./routes/checkout/checkout";
import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";

import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then(user => setCurrentUser(user))
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
