import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white p-4">
        <nav className="flex gap-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "font-bold underline" : ""}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "font-bold underline" : ""}
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}