import { Link } from "react-router-dom";  // Імпортуємо Link з react-router-dom
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        {/* Додаємо посилання на головну сторінку */}
        <li><Link to="/"><img src="/assets/images/menu_img/li_dashboard.svg" alt="li_dashboard" />Dashboard</Link></li>
        {/* Посилання на сторінку профілю */}
        <li><Link to="/profile"><img src="/assets/images/menu_img/li_profile.svg" alt="li_profile" />Profile</Link></li>
        <li><img src="/assets/images/menu_img/li_leader.svg" alt="li_leader" />Leaderboard</li>
        <li><img src="/assets/images/menu_img/li_order.svg" alt="li_order" />Order</li>
        <li><img src="/assets/images/menu_img/li_product.svg" alt="li_product" />Product</li>
        <li><img src="/assets/images/menu_img/li_sales.svg" alt="li_sales" />Sales Report</li>
        <li><img src="/assets/images/menu_img/li_message.svg" alt="li_message" />Message</li>
        <li><img src="/assets/images/menu_img/li_settings.svg" alt="li_settings" />Settings</li>
        <li><img src="/assets/images/menu_img/li_favourite.svg" alt="li_favourite" />Favourite</li>
        <li><img src="/assets/images/menu_img/li_history.svg" alt="li_history" />History</li>
        <li><img src="/assets/images/menu_img/li_signout.svg" alt="li_signout" />Signout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
