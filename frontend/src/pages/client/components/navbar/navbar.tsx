import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/use-user.store";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/assets";
import {
  Cog,
  DoorOpen,
  LayoutDashboard,
  MenuIcon,
  User,
  X,
} from "lucide-react";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export function Navbar() {
  const { user, clearUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    clearUser();
  };

  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Link to="/">
                <img className="" src={Logo} alt="Welfare Program" />
              </Link>
              <span className="text-2xl font-bold text-primary">
                Welfare Program
              </span>
            </div>
            <div className="hidden sm:ml-6 md:flex sm:space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`border-transparent ${
                    location.pathname === link.path
                      ? "text-primary border-b-2 border-primary"
                      : "hover:border-gray-300 hover:text-primary-foreground"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="max-lg:hidden space-x-2">
                  <span>Welcome,</span>
                  <span className="font-bold text-primary">{user.name}</span>
                  <ModeToggle />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MenuIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="space-x-1">
                      <span>{user?.role === "ADMIN" ? "Admin" : "My"}</span>
                      <span>Account</span>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="lg:hidden">
                      <div className="flex flex-col space-y-1">
                        <span className="font-bold text-primary">
                          {user.name}
                        </span>
                        <span>{user.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {user?.role === "ADMIN" ? (
                        <>
                          <DropdownMenuItem>
                            <LayoutDashboard />
                            <Link to="/admin">Dashboard</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User />
                            <Link to="/admin/settings/account">Account</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Cog />
                            <Link to="/admin/settings">Settings</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLogout()}>
                            Log out
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem>
                            <User />
                            <Link to="/settings/account">Account</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Cog />
                            <Link to="/settings">Settings</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleLogout()}>
                            Log out
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button variant="default" asChild className="ml-4">
                  <Link to="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="default"
              className=""
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X /> : <MenuIcon size={20} />}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Links */}
            <div className="pt-2 pb-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname === link.path
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* User Info */}
            <div className="pt-4 pb-3 border-y border-gray-200">
              {user ? (
                <div className="flex flex-col items-start">
                  <div className="flex items-center justify-between px-4">
                    <div>
                      <div className="text-base space-x-1">
                        Welcome,
                        <span className="text-primary font-medium ml-1">
                          {user.name}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <div>
                      <ModeToggle />
                    </div>
                  </div>
                  <div
                    className="mt-4 w-full
                    flex flex-col space-y-2 text-base font-medium
                  "
                  >
                    <Link
                      to="/settings/account"
                      className="flex w-full hover:bg-primary-foreground space-x-2 px-4 py-2"
                    >
                      <User />
                      <span>Account</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex  w-full hover:bg-primary-foreground space-x-2 px-4 py-2"
                    >
                      <Cog />
                      <span>Settings</span>
                    </Link>
                    <span
                      className="cursor-pointer flex  w-full hover:bg-primary-foreground space-x-2 px-4 py-2"
                      onClick={() => handleLogout()}
                    >
                      <DoorOpen />
                      <span>Log out</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center space-x-4 px-4">
                  <Button variant="default" asChild>
                    <Link to="/auth/login">Login</Link>
                  </Button>
                  <Button variant="default" asChild>
                    <Link to="/auth/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
