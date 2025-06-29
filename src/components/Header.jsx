import { CarIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-content">
        <CarIcon size={60} strokeWidth={2.2} className="header-icon" />
        <div>
          <h2 className="header-title">Car Collection</h2>
          <p className="header-subtitle">Luxury | Style | Performance</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
