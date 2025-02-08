import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import CountUp from "react-countup";
import "./MainContent.css";

// Дані для діаграм
const dataLevel = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 700 },
  { name: "May", sales: 600 },
  { name: "Jun", sales: 800 },
];

const dataCustomerFulfilment = [
  { name: "Jan", currentMonth: 400, previousMonth: 350 },
  { name: "Feb", currentMonth: 500, previousMonth: 460 },
  { name: "Mar", currentMonth: 600, previousMonth: 550 },
  { name: "Apr", currentMonth: 700, previousMonth: 650 },
  { name: "May", currentMonth: 750, previousMonth: 720 },
  { name: "Jun", currentMonth: 800, previousMonth: 780 },
];

const dataEarnings = [
  { name: "Jan", earnings: 200 },
  { name: "Feb", earnings: 250 },
  { name: "Mar", earnings: 300 },
  { name: "Apr", earnings: 350 },
  { name: "May", earnings: 400 },
  { name: "Jun", earnings: 450 },
];

const fakeVisitorData = [
  { month: "Jan", newVisitors: 1200 },
  { month: "Feb", newVisitors: 1500 },
  { month: "Mar", newVisitors: 1700 },
  { month: "Apr", newVisitors: 1600 },
  { month: "May", newVisitors: 1800 },
  { month: "Jun", newVisitors: 2000 },
];

const MainContent = () => {
  const [exchangeRates, setExchangeRates] = useState({
    USD: null,
    EUR: null,
    CAD: null,
    PLN: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [topProducts, setTopProducts] = useState([]);
  const [visitorData, setVisitorData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setTopProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") return;

    const foundProduct = products.find(
      (product) => product.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (foundProduct && !topProducts.some((p) => p.id === foundProduct.id)) {
      setTopProducts((prev) => [...prev.slice(0, 3), foundProduct]);
    }
  }, [searchQuery, topProducts, products]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!res.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await res.json();
        setExchangeRates({
          USD: data.rates.UAH,
          EUR: data.rates.UAH / data.rates.EUR,
          CAD: data.rates.UAH / data.rates.CAD,
          PLN: data.rates.UAH / data.rates.PLN,
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setExchangeRates({ USD: 0, EUR: 0, CAD: 0, PLN: 0 });
      }
    };
    fetchExchangeRates();
  }, []);


  // Симулюємо запит до бази даних для отримання даних відвідувачів
  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Замінити на реальний API-запит
        const data = fakeVisitorData;
        setVisitorData(data);
      } catch (error) {
        // Логуємо помилку у разі невдачі
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <div className="main-content">
      <div className="search-and-currency">
        {/* Пошук по сайту */}
        <div className="search">
        <button>
          <img src="/assets/images/search.svg" alt="Search" />
        </button>
        <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>

        {/* Курс валют */}
        <div className="currency">
          <span>USD</span>
          <p>
            {exchangeRates.USD
              ? `${exchangeRates.USD.toFixed(2)} UAH`
              : "Loading..."}
          </p>
          <span>EUR</span>
          <p>
            {exchangeRates.EUR
              ? `${exchangeRates.EUR.toFixed(2)} UAH`
              : "Loading..."}
          </p>
          <span>CAD</span>
          <p>
            {exchangeRates.CAD
              ? `${exchangeRates.CAD.toFixed(2)} UAH`
              : "Loading..."}
          </p>
          <span>PLN</span>
          <p>
            {exchangeRates.PLN
              ? `${exchangeRates.PLN.toFixed(2)} UAH`
              : "Loading..."}
          </p>
        </div>
      </div>

      <div className="dashboard-sections">
        {/* Todays Sales Section */}
        <div className="section todays-sales">
          <h3>Today`s Sales</h3>
          <div className="sales-counters">
  {[
    {
      sales: 1000,
      icon: "/assets/images/today_sales/total_sales.svg",
      label: "Total Sales",
    },
    {
      sales: 1200,
      icon: "/assets/images/today_sales/total_order.svg",
      label: "Total Orders",
    },
    {
      sales: 1500,
      icon: "/assets/images/today_sales/product_sold.svg",
      label: "Products Sold",
    },
    {
      sales: 1100,
      icon: "/assets/images/today_sales/new_customer.svg",
      label: "New Customers",
    },
  ].map((item, index) => (
    <div className="counter" key={index}>
      <img
        src={item.icon}
        alt={`icon-${index}`}
        className="sales-icon"
      />
      <CountUp end={item.sales} duration={2} />
      <p>{item.label}</p>
    </div>
  ))}
</div>

        </div>

        {/* Level Section */}
        <div className="section level">
          <h3>Level</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dataLevel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products Section */}
        <div className="section top-products">
        <h3>Top Products</h3>
        <table className="top-products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Popularity</th>
              <th>Sales (%)</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  <div
                    className="popularity-bar"
                    style={{ width: `${product.popularity}%`, backgroundColor: product.color }}
                  ></div>
                </td>
                <td>
                  <div
                    className="sales-percentage"
                    style={{ color: product.color, border: `2px solid ${product.color}` }}
                  >
                    {product.sales}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Customer Fulfilment Section */}
        <div className="section customer-fulfilment">
          <h3>Customer Fulfilment</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dataCustomerFulfilment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="currentMonth" stroke="#8884d8" />
              <Line type="monotone" dataKey="previousMonth" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings Section */}
        <div className="section earnings">
          <h3>Earnings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dataEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="earnings" stroke="#28AEF3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Visitor Insights Section */}
        <div className="section visitor-insights">
          <h3>Visitor Insights</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="newVisitors" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
