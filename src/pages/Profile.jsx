import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Profile.css";

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("last3months");
  const [salesData, setSalesData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Симуляція логіну
  const login = (email, password) => {
    if (email === "test@gmail.com" && password === "123456") {
      setIsAuthenticated(true);
      fetch("/data/fakeData.json")
        .then((response) => response.json())
        .then((data) => {
          setUser(data[email]);
          setError("");
        })
        .catch(() => setError("Помилка завантаження даних"));
    } else {
      setError("Невірний логін або пароль!");
    }
  };

  // Симуляція виходу
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  //Скорочення назви місяців, для красивого виводу на будь-якому екрані
  const monthsShort = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  // Обробка вибору періоду
  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
    setIsDropdownOpen(false); // Закриваємо кастомний список
  };

  // Підготовка даних для діаграми
  const getChartData = (period) => {
    const sales = user?.monthlySales || {};
    let data = [];
  
    if (period === "last3months") {
      const months = ["October", "November", "December"];
      months.forEach((month) => {
        data.push({ month: monthsShort[month], sales: sales[month] });
      });
    } else if (period === "last6months") {
      const months = [
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      months.forEach((month) => {
        data.push({ month: monthsShort[month], sales: sales[month] });
      });
    } else if (period === "last12months") {
      for (const month in sales) {
        data.push({ month: monthsShort[month], sales: sales[month] });
      }
    }
  
    return data;
  };

  useEffect(() => {
    if (user) {
      setSalesData(getChartData(selectedPeriod));
    }
  }, [user, selectedPeriod]);

  const periodOptions = [
    { value: "last3months", label: "Last 3 Months" },
    { value: "last6months", label: "Last 6 Months" },
    { value: "last12months", label: "Last 12 Months" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="login_form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(email, password);
          }}
        >
          <div className="login_form-rows">
            <label htmlFor="email">Login</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@gmail.com"
              required
            />
          </div>
          <div className="login_form-rows">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="btn__login" type="submit">LogIn</button>
        </form>
      </div>
    );
  }

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile">
      <div className="user-info">
        <div className="user-info__header">
          <div className="user__resume">
            <img src={user.avatar} alt="Avatar" className="avatar" />
            <div>{user.name}</div>
            <div>
              <span>{user.role}</span>
            </div>
          </div>
          <button className="btn__logout" onClick={handleSignOut}>
            LogOut
          </button>
        </div>
        <div className="user-info__sales">
          <div className="user-sales-title">Sales Achievements</div>
          <div
            className="custom-dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="dropdown-trigger">
              {
                periodOptions.find((option) => option.value === selectedPeriod)
                  ?.label
              }
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-options">
                {periodOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handlePeriodChange(option.value)}
                    className="dropdown-option"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Profile;
