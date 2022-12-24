import './index.scss';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
