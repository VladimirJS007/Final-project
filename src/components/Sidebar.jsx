import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><img src="./src/assets/images/menu_img/li_dashboard.svg" alt="li_dashboard" />Dashboard</li>
        <li><img src="./src/assets/images/menu_img/li_profile.svg" alt="li_profile" />Profile</li>
        <li><img src="./src/assets/images/menu_img/li_leader.svg" alt="li_leader" />Leaderboard</li>
        <li><img src="./src/assets/images/menu_img/li_order.svg" alt="li_order" />Order</li>
        <li><img src="./src/assets/images/menu_img/li_product.svg" alt="li_product" />Product</li>
        <li><img src="./src/assets/images/menu_img/li_sales.svg" alt="li_sales" />Sales Report</li>
        <li><img src="./src/assets/images/menu_img/li_message.svg" alt="li_message" />Message</li>
        <li><img src="./src/assets/images/menu_img/li_settings.svg" alt="li_settings" />Settings</li>
        <li><img src="./src/assets/images/menu_img/li_favourite.svg" alt="li_favourite" />Favourite</li>
        <li><img src="./src/assets/images/menu_img/li_history.svg" alt="li_history" />History</li>
        <li><img src="./src/assets/images/menu_img/li_signout.svg" alt="li_signout" />Signout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
