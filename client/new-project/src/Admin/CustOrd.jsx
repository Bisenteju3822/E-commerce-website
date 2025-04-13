import axios from "axios";
import { useState, useEffect } from "react";
import Base_URL from "../config/BaseUrl";

const CustomerOrd = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
    let api = `${Base_URL}admin/getcustomerorder`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const ans = mydata.map((key) => {
    return (
      <tr key={key.id} className="border-b hover:bg-gray-100">
        <td className="px-4 py-2">{key.totalamount}</td>
        <td className="px-4 py-2">{key.customername}</td>
        <td className="px-4 py-2">{key.address}</td>
        <td className="px-4 py-2">{key.contact}</td>
        <td className="px-4 py-2">{key.email}</td>
        <td className="px-4 py-2">{key.dop}</td>
      </tr>
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Customer Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              \ <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Shipping Address</th>
              <th className="px-4 py-2 border">Contact No</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date of Purchase</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrd;
