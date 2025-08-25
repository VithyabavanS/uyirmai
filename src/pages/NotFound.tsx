import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-organic">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for seems to have wandered off like a leaf in the wind.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-nature text-primary-foreground rounded-lg hover:shadow-lg transition-smooth"
        >
          Return to Home 🌱
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
