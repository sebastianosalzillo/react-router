import MainNav from "./MainNav";
import "../App.css";

function AppHeader() {
  return (
    <header className="appHeader">
      <h1>Benvenuti nel mio blog</h1>
      <MainNav />
    </header>
  );
}

export default AppHeader;
