import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NavBar = () => {
  const authenticated = useSelector((state) => state.isAuthenticated); // Obtiene el estado de autenticación del usuario
  const adminUser = useSelector((state) => state.profileUser); // Obtiene el perfil del usuario desde Redux

  return (
    <div id="containerNavBar" className="container-fluid">
      {/* Contenedor del NavBar */}
      {authenticated === true &&
        adminUser.admin === true && ( // Condición para mostrar el NavBar solo si el usuario está autenticado y es administrador
          <div className="card text-center">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userProfile">
                    UserProfile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
    </div>
  );
};

export default NavBar;
