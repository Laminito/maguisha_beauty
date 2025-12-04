import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import { useCartStore } from '../../store/cartStore';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export default function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { totalAmount, totalItems } = useCartStore();

  const deliveryFee = totalAmount > 0 ? 2000 : 0;
  const total = totalAmount + deliveryFee;

  return (
    <div className="card p-6 sticky top-24">
      <h2 className="font-heading font-bold text-xl mb-4">Récapitulatif</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total ({totalItems} {totalItems > 1 ? 'articles' : 'article'})</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Livraison</span>
          <span className="font-medium">
            {deliveryFee > 0 ? formatCurrency(deliveryFee) : 'Gratuite'}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>

      {showCheckoutButton && totalAmount > 0 && (
        <>
          <Link to="/checkout" className="btn btn-primary w-full mb-3">
            Passer la commande
          </Link>
          
          <div className="text-center text-sm text-gray-600 mb-4">
            <p className="font-medium mb-1">Options de paiement :</p>
            <div className="space-y-1">
              <p>💵 Paiement Cash</p>
              <p className="text-secondary font-semibold">
                💳 Paiement à Crédit (3, 6 ou 12 mois)
              </p>
            </div>
          </div>

          <div className="bg-gradient-primary text-white p-4 rounded-lg text-sm">
            <p className="font-semibold mb-1">Paiement à crédit :</p>
            <div className="space-y-1 opacity-90">
              <p>• 3 mois : {formatCurrency(Math.round(total / 3))}/mois</p>
              <p>• 6 mois : {formatCurrency(Math.round(total / 6))}/mois</p>
              <p>• 12 mois : {formatCurrency(Math.round(total / 12))}/mois</p>
            </div>
          </div>
        </>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Paiement 100% sécurisé</span>
        </div>
      </div>
    </div>
  );
}
