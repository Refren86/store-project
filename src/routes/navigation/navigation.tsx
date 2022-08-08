import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink,
  Logo,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartVisible = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinks>

        {isCartVisible && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
