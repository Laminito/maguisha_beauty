import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, StarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} ajouté au panier`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  const handleReserveCash = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    navigate('/cart');
    toast.success('Produit ajouté - Paiement cash', {
      icon: '💵',
      duration: 2000,
    });
  };

  const handleReserveCredit = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    navigate('/checkout');
    toast.success('Produit ajouté - Paiement crédit', {
      icon: '💳',
      duration: 2000,
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris', {
      icon: isWishlisted ? '💔' : '❤️',
      duration: 2000,
    });
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="card animate-fade-in">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="badge bg-accent text-white">⭐ Vedette</span>
            )}
            {!product.inStock && (
              <span className="badge bg-gray-500 text-white">Rupture</span>
            )}
            {product.compareAtPrice && (
              <span className="badge bg-red-500 text-white">Promo</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            {isWishlisted ? (
              <HeartIcon className="w-5 h-5 text-error" />
            ) : (
              <HeartOutlineIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn btn-primary w-full text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category === 'wigs' && 'Perruque'}
            {product.category === 'weaves' && 'Tissage'}
            {product.category === 'extensions' && 'Extension'}
            {product.category === 'hair-care' && 'Soin'}
            {product.category === 'lingerie' && 'Lingerie'}
            {product.category === 'sleepwear' && 'Nuit'}
            {product.category === 'accessories' && 'Accessoire'}
            {product.category === 'beauty' && 'Beauté'}
            {product.category === 'intimate' && 'Intime'}
            {product.category === 'wellness' && 'Bien-Être'}
          </p>

          {/* Title */}
          <h3 className="font-heading font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-accent'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>

          {/* Reservation Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleReserveCash}
              disabled={!product.inStock}
              className="btn w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white text-sm py-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <BanknotesIcon className="w-4 h-4" />
              Réserver Cash
            </button>
            
            {product.price >= 10000 && (
              <button
                onClick={handleReserveCredit}
                disabled={!product.inStock}
                className="btn w-full bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white text-sm py-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <CreditCardIcon className="w-4 h-4" />
                Réserver Crédit
              </button>
            )}
          </div>

          {/* Credit Info */}
          {product.price >= 10000 && (
            <p className="text-xs text-center text-gray-500 mt-2">
              ou {formatCurrency(Math.round(product.price / 12))}/mois x 12 mois
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
