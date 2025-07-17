import React, { useState, useEffect } from "react";
import UserMenu from "./../../components/layout/UserMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useCart } from "../../context/cart";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const UserFav = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name} `}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} Recipes in your favorites ❤️ ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "You have nothing saved as your favourite."}
            </h4>
            <div className="row ">
              <div className="col-md-12">
                {cart?.map((p) => (
                  <div className="row mb-2 cart-card">
                    <div className="col-md-4">
                      <img
                        className="product-image"
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-md-8">
                      <h4>{p.name}</h4>
                      {console.log(p.description)}
                      <h6>{p.description.substring(0, 30)}</h6>
                      <h6>Price : {p.price}</h6>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserFav;
