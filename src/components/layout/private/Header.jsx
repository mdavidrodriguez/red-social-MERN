import { Nav } from "./nav";

export const Header = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <a href="#" className="navbar__title">
          RedSocial
        </a>
      </div>
      <Nav/>
    </header>
  );
};
