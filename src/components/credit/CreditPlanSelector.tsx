import { useState } from 'react';
import type { CreditPlan } from '../../types/kredika';
import { formatCurrency } from '../../utils/currency';
import kredikaService from '../../services/kredikaService';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface CreditPlanSelectorProps {
  amount: number;
  onSelectPlan: (plan: CreditPlan) => void;
}

export default function CreditPlanSelector({ amount, onSelectPlan }: CreditPlanSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(null);

  const plans: CreditPlan[] = [3, 6, 12];
  const interestRate = 0.15; // 15% annual interest rate

  const getPlanDetails = (months: CreditPlan) => {
    const monthlyPayment = kredikaService.calculateMonthlyPayment(amount, months, interestRate);
    const totalRepayment = kredikaService.calculateTotalRepayment(monthlyPayment, months);
    const totalInterest = totalRepayment - amount;

    return {
      months,
      monthlyPayment,
      totalRepayment,
      totalInterest,
      interestRate,
    };
  };

  const handleSelectPlan = (plan: CreditPlan) => {
    setSelectedPlan(plan);
    onSelectPlan(plan);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-2xl mb-2">
          Choisissez votre plan de paiement
        </h3>
        <p className="text-gray-600">
          Montant à financer : <span className="font-bold text-primary">{formatCurrency(amount)}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const details = getPlanDetails(plan);
          const isSelected = selectedPlan === plan;
          const isRecommended = plan === 6;

          return (
            <button
              key={plan}
              onClick={() => handleSelectPlan(plan)}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge bg-accent text-white">Recommandé</span>
                </div>
              )}

              {isSelected && (
                <div className="absolute -top-2 -right-2">
                  <CheckCircleIcon className="w-8 h-8 text-success" />
                </div>
              )}

              <div className="text-center">
                <div className="font-heading font-bold text-4xl mb-2 gradient-text">
                  {plan}
                </div>
                <p className="text-gray-600 mb-4">mois</p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Paiement mensuel</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(details.monthlyPayment)}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total à rembourser</span>
                      <span className="font-semibold">{formatCurrency(details.totalRepayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intérêts</span>
                      <span className="font-semibold text-secondary">
                        {formatCurrency(details.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="bg-gradient-primary text-white p-6 rounded-xl animate-slide-up">
          <h4 className="font-bold text-lg mb-3">📋 Résumé de votre plan</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-90 mb-1">Durée</p>
              <p className="font-bold text-xl">{selectedPlan} mois</p>
            </div>
            <div>
              <p className="opacity-90 mb-1">Paiement mensuel</p>
              <p className="font-bold text-xl">
                {formatCurrency(getPlanDetails(selectedPlan).monthlyPayment)}
              </p>
            </div>
            <div>
              <p className="opacity-90 mb-1">Première échéance</p>
              <p className="font-bold">
                {formatCurrency(getPlanDetails(selectedPlan).monthlyPayment)}
              </p>
            </div>
            <div>
              <p className="opacity-90 mb-1">Taux d'intérêt</p>
              <p className="font-bold">{(interestRate * 100).toFixed(0)}% / an</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
