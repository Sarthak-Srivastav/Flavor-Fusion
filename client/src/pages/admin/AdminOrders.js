import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import moment from "moment";
import { Select } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons";
import "../../styles/OrderTable.css";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="order-box col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="order1 shadow mb-3 p-3 d-flex flex-column align-items-center">
                  <table className="content-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            suffixIcon={<DownCircleTwoTone />}
                            className="form-select-order"
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option
                                key={i}
                                value={s}
                                className="custom-option-order"
                              >
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container d-flex flex-column align-items-center">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 order-cart-card">
                        <div className="order-cart-image col-md-4">
                          <img
                            className="product-image-order"
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="order-card-cart-info col-md-8">
                          <h3>{p.name}</h3>
                          {console.log(p.description)}
                          <h5>{p.description.substring(0, 30)}</h5>
                          <h5>Price : {p.price}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
