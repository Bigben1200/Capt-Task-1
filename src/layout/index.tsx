import SideNavigation from "./side-navigation";
import "./layout.scss";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div id="layout">
      <SideNavigation />
      <main id="main">{children}</main>
    </div>
  );
};

export default Layout;
