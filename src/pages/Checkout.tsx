import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import CartSummary from '../components/cart/CartSummary';
import CreditPlanSelector from '../components/credit/CreditPlanSelector';
import PaymentInstructions from '../components/credit/PaymentInstructions';
import type { CreditPlan, PaymentInstructions as PaymentInstructionsType } from '../types/kredika';
import kredikaService from '../services/kredikaService';
import toast from 'react-hot-toast';

type CheckoutStep = 'customer-info' | 'payment-method' | 'credit-plan' | 'payment-instructions' | 'confirmation';

export default function Checkout() {
  const navigate = useNavigate();
  const { totalAmount, items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer-info');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CREDIT' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(null);
  const [paymentInstructions, setPaymentInstructions] = useState<PaymentInstructionsType | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: 'Dakar',
    country: 'Sénégal',
  });

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment-method');
  };

  const handlePaymentMethodSelect = (method: 'CASH' | 'CREDIT') => {
    setPaymentMethod(method);
    if (method === 'CASH') {
      handleCashCheckout();
    } else {
      setCurrentStep('credit-plan');
    }
  };

  const handleCashCheckout = async () => {
    setLoading(true);
    try {
      // Simulate order creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Commande créée avec succès !');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error('Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  const handleCreditPlanSelect = async (plan: CreditPlan) => {
    setSelectedPlan(plan);
    setLoading(true);
    
    try {
      // Create credit reservation
      const reservation = await kredikaService.createCreditReservation({
        customerFirstName: customerInfo.firstName,
        customerLastName: customerInfo.lastName,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        creditAmount: totalAmount,
        durationMonths: plan,
        purchaseDescription: `Achat Beauty Hair - ${items.length} articles`,
      });

      // Generate payment instructions
      const instructions = await kredikaService.generatePaymentInstructions(reservation.reservationId);
      
      setPaymentInstructions(instructions);
      setCurrentStep('payment-instructions');
      
      toast.success('Réservation créée avec succès !');
    } catch (error) {
      console.error('Credit checkout error:', error);
      toast.error('Erreur lors de la création de la réservation');
      
      // Mock payment instructions for demo
      setPaymentInstructions({
        reservationId: 'RES-' + Date.now(),
        amount: Math.round(totalAmount / plan),
        reference: 'BH-' + Date.now().toString().slice(-8),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        paymentMethods: [
          {
            type: 'mobile_money',
            provider: 'Orange Money',
            accountNumber: '77 123 45 67',
            accountName: 'Beauty Hair Shop',
            instructions: '1. Composez #144#\n2. Choisissez "Transfert d\'argent"\n3. Entrez le numéro: 77 123 45 67\n4. Montant: ' + Math.round(totalAmount / plan) + ' FCFA\n5. Référence: votre numéro de réservation',
          },
          {
            type: 'mobile_money',
            provider: 'Wave',
            accountNumber: '78 987 65 43',
            accountName: 'Beauty Hair Shop',
            instructions: '1. Ouvrez l\'app Wave\n2. Choisissez "Envoyer de l\'argent"\n3. Scannez le QR code ou entrez: 78 987 65 43\n4. Montant: ' + Math.round(totalAmount / plan) + ' FCFA\n5. Ajoutez la référence dans la note',
          },
          {
            type: 'bank_transfer',
            provider: 'Banque Atlantique',
            accountNumber: 'SN08 1234 5678 9012 3456 7890 12',
            accountName: 'Beauty Hair SARL',
            instructions: 'Effectuez un virement bancaire vers notre compte en mentionnant impérativement la référence de paiement.',
          },
        ],
      });
      setCurrentStep('payment-instructions');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-8 gradient-text">
          Finaliser ma commande
        </h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            {[
              { id: 'customer-info', label: 'Infos', icon: '1' },
              { id: 'payment-method', label: 'Paiement', icon: '2' },
              { id: 'credit-plan', label: 'Plan', icon: '3', show: paymentMethod === 'CREDIT' },
              { id: 'payment-instructions', label: 'Instructions', icon: '4', show: paymentMethod === 'CREDIT' },
            ].filter(step => step.show !== false).map((step, index, arr) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 ${
                  currentStep === step.id ? 'text-primary' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep === step.id ? 'bg-primary text-white' : 'bg-gray-200'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="hidden md:block font-medium">{step.label}</span>
                </div>
                {index < arr.length - 1 && (
                  <div className="w-12 md:w-24 h-1 bg-gray-200 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card p-6 md:p-8">
              {/* Step 1: Customer Info */}
              {currentStep === 'customer-info' && (
                <form onSubmit={handleCustomerInfoSubmit} className="space-y-6">
                  <h2 className="font-heading font-bold text-2xl mb-4">Informations de livraison</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="77 123 45 67"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Adresse *</label>
                    <input
                      type="text"
                      required
                      placeholder="Numéro et nom de rue"
                      value={customerInfo.street}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ville *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pays *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.country}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, country: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Continuer vers le paiement
                  </button>
                </form>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 'payment-method' && (
                <div className="space-y-6">
                  <h2 className="font-heading font-bold text-2xl mb-4">Mode de paiement</h2>

                  <div className={`grid ${totalAmount >= 10000 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4`}>
                    <button
                      onClick={() => handlePaymentMethodSelect('CASH')}
                      disabled={loading}
                      className="card p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary text-left"
                    >
                      <div className="text-4xl mb-3">💵</div>
                      <h3 className="font-bold text-xl mb-2">Paiement Cash</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Payez à la livraison en espèces ou par mobile money
                      </p>
                      <p className="text-primary font-semibold">Livraison sous 24-48h</p>
                    </button>

                    {totalAmount >= 10000 && (
                      <button
                        onClick={() => handlePaymentMethodSelect('CREDIT')}
                        disabled={loading}
                        className="card p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-secondary text-left relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-xs font-bold">
                          Populaire
                      </div>
                      <div className="text-4xl mb-3">💳</div>
                      <h3 className="font-bold text-xl mb-2">Paiement à Crédit</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Payez en 3, 6 ou 12 mensualités via Kredika
                      </p>
                      <p className="text-secondary font-semibold">À partir de {Math.round(totalAmount / 12).toLocaleString()} FCFA/mois</p>
                    </button>
                    )}
                  </div>

                  {totalAmount < 10000 && (
                    <div className="card p-4 bg-orange-50 border border-orange-200">
                      <p className="text-sm text-orange-800">
                        ℹ️ Le paiement à crédit est disponible uniquement pour les achats de 10 000 FCFA et plus.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Credit Plan */}
              {currentStep === 'credit-plan' && (
                <div>
                  <CreditPlanSelector
                    amount={totalAmount}
                    onSelectPlan={handleCreditPlanSelect}
                  />
                  {selectedPlan && !loading && (
                    <div className="mt-6 text-center">
                      <p className="text-gray-600 mb-4">Création de votre réservation en cours...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Payment Instructions */}
              {currentStep === 'payment-instructions' && paymentInstructions && (
                <div>
                  <PaymentInstructions instructions={paymentInstructions} />
                  
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        clearCart();
                        navigate('/orders');
                      }}
                      className="btn btn-primary"
                    >
                      J'ai effectué le paiement
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
