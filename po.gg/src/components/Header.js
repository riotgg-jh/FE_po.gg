import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link> |  
      <Link to="/find_duo">Find Duo</Link> |  
      <Link to="/user_search">User Search</Link>
    </nav>
  );
}

export default Header;
