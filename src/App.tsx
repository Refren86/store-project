import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

import Spinner from './components/spinner/spinner';
import { checkUserSession } from './store/user/user.action';

const Home = lazy(() => import('./routes/home/home'));
const Authentication = lazy(
  () => import('./routes/authentication/authentication')
);
const Shop = lazy(() => import('./routes/shop/shop'));
const Checkout = lazy(() => import('./routes/checkout/checkout'));
const Navigation = lazy(() => import('./routes/navigation/navigation'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
