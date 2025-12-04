import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { items, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-3xl mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">
              Découvrez nos magnifiques produits et ajoutez-les à votre panier
            </p>
            <Link to="/products" className="btn btn-primary inline-flex items-center gap-2">
              <ArrowLeftIcon className="w-5 h-5" />
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary-600 mb-4 transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Continuer vos achats
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-4xl gradient-text">
            Mon Panier
          </h1>
          <p className="text-gray-600 mt-2">
            {totalItems} article{totalItems > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
