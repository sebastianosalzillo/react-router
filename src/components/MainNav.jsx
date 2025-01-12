import { NavLink } from "react-router-dom";

function MainNav() {
  const menu = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/creaPost",
      title: "Crea Post", // Cambia il titolo
    },
  ];

  return (
    <nav className="navBar">
      <ul>
        {menu.map((curItem) => (
          <li key={curItem.path}>
            <NavLink to={curItem.path}>{curItem.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
