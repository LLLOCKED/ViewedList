import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { googleSignIn, logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await googleSignIn?.();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut?.();
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center justify-between py-10 text-lg">
      <h1 className="font-bold active">watch list</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {user?.displayName && (
            <>
              <li>
                <NavLink to="/list">Your Lists</NavLink>
              </li>
              <li>
                <NavLink to="/recommendations">Your Rec</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex space-x-2">
        {!user?.displayName ? (
          <button
            className="px-4 py-2 bg-black text-amber-50 rounded-xl"
            onClick={handleSignOut}
          >
            Sign in
          </button>
        ) : (
          <>
            <img
              className="rounded-full"
              src={user?.photoURL ? user?.photoURL : "#"}
              alt="1"
              width="40"
              height="40"
              referrerPolicy="no-referrer"
            />
            <button
              className="px-4 py-2 bg-black text-amber-50 rounded-xl"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
