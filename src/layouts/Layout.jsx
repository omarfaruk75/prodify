import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div className="px-12 container mx-auto">
            {/* Navbar */}
            <Navbar />

            {/* Outlet */}
            <div className="min-h-[calc(100vh-306px)]">
                <Outlet />
            </div>


            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;