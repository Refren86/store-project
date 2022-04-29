import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home";
import Shop from "./routes/shop/shop";
import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
