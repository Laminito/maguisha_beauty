import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  BanknotesIcon,
  CreditCardIcon
} from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import type { Product } from '../types/product';
import { formatCurrency } from '../utils/currency';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { mockProducts } from '../data/mockProducts';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${product.name} (×${quantity}) ajouté au panier`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate('/checkout');
  };

  const handleReserveCash = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate('/cart');
    toast.success('Produit ajouté - Paiement cash', {
      icon: '💵',
      duration: 2000,
    });
  };

  const handleReserveCredit = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate('/checkout');
    toast.success('Produit ajouté - Paiement crédit', {
      icon: '💳',
      duration: 2000,
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris', {
      icon: isWishlisted ? '💔' : '❤️',
      duration: 2000,
    });
  };

  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const categoryLabels: Record<string, string> = {
    'wigs': 'Perruques',
    'weaves': 'Tissages',
    'extensions': 'Extensions',
    'hair-care': 'Soins Capillaires',
    'lingerie': 'Lingerie',
    'sleepwear': 'Vêtements de Nuit',
    'accessories': 'Accessoires',
    'beauty': 'Beauté',
    'intimate': 'Produits Intimes',
    'wellness': 'Bien-être',
  };

  // Produits similaires
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Retour aux produits
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="card p-4 mb-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-primary scale-105' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Garanties */}
            <div className="card p-4 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <TruckIcon className="w-5 h-5 text-primary mr-3" />
                <span>Livraison rapide à Dakar et environs</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ShieldCheckIcon className="w-5 h-5 text-primary mr-3" />
                <span>Produits 100% authentiques garantis</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCardIcon className="w-5 h-5 text-primary mr-3" />
                <span>Paiement à crédit disponible via Kredika</span>
              </div>
            </div>
          </div>

          {/* Détails */}
          <div>
            <div className="card p-6">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.featured && (
                  <span className="badge bg-accent text-white">⭐ Vedette</span>
                )}
                {discount > 0 && (
                  <span className="badge bg-red-500 text-white">-{discount}%</span>
                )}
                <span className="badge bg-primary/10 text-primary">
                  {categoryLabels[product.category]}
                </span>
              </div>

              <h1 className="font-heading font-bold text-3xl mb-4">{product.name}</h1>

              {/* Évaluation */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} avis)
                </span>
              </div>

              {/* Prix */}
              <div className="mb-6">
                {product.compareAtPrice && (
                  <div className="text-gray-400 line-through text-lg mb-1">
                    {formatCurrency(product.compareAtPrice)}
                  </div>
                )}
                <div className="text-3xl font-bold gradient-text">
                  {formatCurrency(product.price)}
                </div>
                {product.price >= 10000 && (
                  <div className="text-sm text-gray-600 mt-2">
                    ou <span className="font-semibold text-primary">
                      {formatCurrency(product.price / 6)}/mois
                    </span> pendant 6 mois
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Marque */}
              {product.brand && (
                <div className="mb-6">
                  <span className="text-sm text-gray-600">Marque: </span>
                  <span className="font-semibold">{product.brand}</span>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Disponibilité */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-green-600 font-semibold">✓ En stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Rupture de stock</span>
                )}
              </div>

              {/* Quantité */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Quantité</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:border-primary transition-colors"
                    disabled={!product.inStock}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 text-center border border-gray-300 rounded-lg"
                    disabled={!product.inStock}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:border-primary transition-colors"
                    disabled={!product.inStock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Panier
                  </button>
                  <button
                    onClick={toggleWishlist}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    {isWishlisted ? (
                      <HeartIcon className="w-5 h-5 text-error" />
                    ) : (
                      <HeartOutlineIcon className="w-5 h-5" />
                    )}
                    Favoris
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="btn-primary w-full"
                >
                  Acheter maintenant
                </button>

                {/* Réservation */}
                <div className="pt-4 border-t space-y-3">
                  <h3 className="font-semibold text-sm text-gray-700">Options de réservation</h3>
                  
                  <button
                    onClick={handleReserveCash}
                    disabled={!product.inStock}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <BanknotesIcon className="w-5 h-5" />
                    Réserver - Paiement Cash
                  </button>

                  {product.price >= 10000 && (
                    <button
                      onClick={handleReserveCredit}
                      disabled={!product.inStock}
                      className="btn w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all"
                    >
                      <CreditCardIcon className="w-5 h-5" />
                      Réserver - Paiement à Crédit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 gradient-text">
              Produits similaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="card group hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 text-sm">
                      {relatedProduct.name}
                    </h3>
                    <div className="font-bold gradient-text">
                      {formatCurrency(relatedProduct.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
