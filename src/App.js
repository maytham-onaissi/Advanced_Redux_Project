import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const toggleCart = useSelector((state) => state.ui.toggle);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.setNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending cart data.",
    //     })
    //   );
    //   const res = await fetch(
    //     // PUT works the same as POST, but overrides the existing data in the database.
    //     // Also it does not restructure the sent data.
    //     "https://react-http-67b91-default-rtdb.firebaseio.com/cart.json",
    //     { method: "PUT", body: JSON.stringify(cart) }
    //   );
    //   if (!res.ok) {
    //     throw new Error("Sending cart Data failed.");
    //   }
    //   dispatch(
    //     uiActions.setNotification({
    //       status: "success",
    //       title: "success!",
    //       message: "Sent cart data successfully.",
    //     })
    //   );
    // };
    if (isInitial) {
      isInitial = false;
      return;
    }
    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.setNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: "Sending cart data failed.",
    //     })
    //   );
    // });

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
