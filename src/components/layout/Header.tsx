import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import AdjaIntimaLogo from '../../assets/logos/AdjaIntimaLogo';

export default function Header() {
  const { totalItems } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Lingerie', path: '/products?category=lingerie' },
    { name: 'Nuit', path: '/products?category=sleepwear' },
    { name: 'Intimes', path: '/products?category=intimate' },
    { name: 'Bien-Être', path: '/products?category=wellness' },
    { name: 'Beauté', path: '/products?category=beauty' },
    { name: 'Accessoires', path: '/products?category=accessories' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-primary text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          🎉 Paiement à crédit disponible - Jusqu'à 12 mois sans frais !
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <AdjaIntimaLogo width={50} height={50} />
            <div className="hidden md:block">
              <h1 className="text-2xl font-heading font-bold gradient-text">ADJA Intima</h1>
              <p className="text-xs text-gray-500">Lingerie & Bien-Être</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 pr-4"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-primary transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <UserIcon className="w-6 h-6" />
                {isAuthenticated && (
                  <span className="hidden md:block text-sm font-medium">
                    {user?.firstName}
                  </span>
                )}
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                {isAuthenticated ? (
                  <>
                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">
                      Mon Compte
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                      Mes Commandes
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-error"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                      Connexion
                    </Link>
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className={`md:flex md:items-center md:gap-8 py-3 ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
            <li>
              <Link 
                to="/" 
                className="block py-2 hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.path}
                  className="block py-2 hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/credit-info"
                className="block py-2 text-secondary hover:text-secondary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                💳 Paiement à Crédit
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
