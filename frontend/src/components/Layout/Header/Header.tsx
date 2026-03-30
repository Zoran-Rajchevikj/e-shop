import {useState} from "react";
import "./Header.css"
import {useNavigate} from "react-router-dom";
import useAuth from "../../../api/hooks/useAuth.ts";
import {ProductType, ProductTypeLabel} from "../../../models/enums.ts";


const MEN_PRODUCT_TYPES = [
    ProductType.ELEK,
    ProductType.DUKSER,
    ProductType.JAKNA,
    ProductType.HELANKI,
    ProductType.DOLEN_DEL_TRENERKI,
    ProductType.MAICA,
    ProductType.PANTALONI,
    ProductType.TRENERKA,
    ProductType.KAPUT
];

const WOMEN_PRODUCT_TYPES = [
    ProductType.ELEK,
    ProductType.DUKSER,
    ProductType.JAKNA,
    ProductType.HELANKI,
    ProductType.DOLEN_DEL_TRENERKI,
    ProductType.MAICA,
    ProductType.PANTALONI,
    ProductType.TRENERKA,
    ProductType.KAPUT,
    ProductType.FUSTAN,
    ProductType.GRADNIK
];

const Header = () => {
    const [search, setSearch] = useState<string>('');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navigate = useNavigate();
    const { logout, isAuthenticated,user} = useAuth();



    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const handleProductTypeClick = (productType: ProductType, category: string) => {
        navigate(`/product-${category}/${productType}`);
        setOpenDropdown(null);
    }

    return(
        <header className="header">
            {/* LEFT – Categories */}
            <nav className="nav">
                {/* MEN DROPDOWN */}
                <div
                    className="nav-dropdown"
                    onMouseEnter={() => setOpenDropdown('men')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <button className="nav-btn" onClick={()=> navigate("/product-men")}>
                        MEN
                    </button>
                    {openDropdown === 'men' && (
                        <div className="dropdown-menu">
                            {MEN_PRODUCT_TYPES.map((type) => (
                                <button
                                    key={type}
                                    className="dropdown-item"
                                    onClick={() => handleProductTypeClick(type, 'men')}
                                >
                                    {ProductTypeLabel[type]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* WOMAN BUTTON */}

                <div
                    className="nav-dropdown"
                    onMouseEnter={() => setOpenDropdown('women')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <button className="nav-btn"
                            onClick={() => navigate("/product-women")}
                    >WOMAN</button>
                {openDropdown === 'women' && (
                    <div className="dropdown-menu">
                        {WOMEN_PRODUCT_TYPES.map((type) => (
                            <button
                                key={type}
                                className="dropdown-item"
                                onClick={() => handleProductTypeClick(type, 'women')}
                            >
                                {ProductTypeLabel[type]}
                            </button>
                        ))}
                    </div>
                )}
                </div>
                {/* KIDS BUTTON */}
                <button className="nav-btn"
                        onClick={() => navigate("/product-kids")}
                >KIDS</button>
            </nav>

            {/* CENTER – Search */}
            <div className="search">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* RIGHT – Cart */}
            <button
                className="cart-btn"
                onClick={() => navigate("/cart")}
            >
                🛒 Cart
            </button>
            {isAuthenticated && (
               <> <span>{user}</span>
                   <button
                   className="logout-btn"
                   onClick={handleLogout}
               >
                   Logout
               </button>
               </>

            )}
        </header>
    )
}
export default Header;