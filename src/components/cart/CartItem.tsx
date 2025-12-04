import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { CartItem as CartItemType } from '../../types/cart';
import { formatCurrency } from '../../utils/currency';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.product.id, newQuantity);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Image */}
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
        <p className="text-lg font-bold text-primary">
          {formatCurrency(item.product.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-error hover:text-error/80 transition-colors"
          title="Retirer du panier"
        >
          <TrashIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="px-3 font-medium min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm font-semibold text-gray-900">
          {formatCurrency(item.product.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
