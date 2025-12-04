import type { PaymentInstructions as PaymentInstructionsType } from '../../types/kredika';
import { formatCurrency } from '../../utils/currency';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface PaymentInstructionsProps {
  instructions: PaymentInstructionsType;
}

export default function PaymentInstructions({ instructions }: PaymentInstructionsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copié dans le presse-papier !');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatExpiry = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary text-white p-6 rounded-xl">
        <h2 className="font-heading font-bold text-2xl mb-2">
          Instructions de paiement
        </h2>
        <p className="text-lg">
          Montant de la première échéance : <span className="font-bold text-3xl">{formatCurrency(instructions.amount)}</span>
        </p>
        <p className="text-sm opacity-90 mt-2">
          ⏰ À payer avant le : {formatExpiry(instructions.expiresAt)}
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg">Référence de paiement</h3>
            <p className="text-sm text-gray-600">À mentionner lors du paiement</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <code className="text-lg font-mono font-bold text-primary">
            {instructions.reference}
          </code>
          <button
            onClick={() => copyToClipboard(instructions.reference, 'reference')}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            {copiedField === 'reference' ? (
              <>
                <CheckIcon className="w-4 h-4" />
                Copié
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-4 h-4" />
                Copier
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl">Choisissez votre mode de paiement</h3>

        {instructions.paymentMethods.map((method, index) => (
          <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  {method.type === 'mobile_money' && '📱'}
                  {method.type === 'bank_transfer' && '🏦'}
                  {method.type === 'card' && '💳'}
                </span>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">
                  {method.type === 'mobile_money' && 'Mobile Money'}
                  {method.type === 'bank_transfer' && 'Virement Bancaire'}
                  {method.type === 'card' && 'Carte Bancaire'}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{method.provider}</p>

                {method.accountNumber && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-2">
                    <p className="text-xs text-gray-600 mb-1">Numéro de compte</p>
                    <div className="flex items-center justify-between">
                      <code className="font-mono font-bold">{method.accountNumber}</code>
                      <button
                        onClick={() => copyToClipboard(method.accountNumber!, 'account-' + index)}
                        className="text-primary hover:text-primary-600 transition-colors"
                      >
                        {copiedField === 'account-' + index ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <ClipboardDocumentIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {method.accountName && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-xs text-gray-600 mb-1">Nom du compte</p>
                    <p className="font-semibold">{method.accountName}</p>
                  </div>
                )}

                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{method.instructions}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="text-sm">
            <p className="font-semibold text-yellow-900 mb-1">Important :</p>
            <ul className="list-disc list-inside space-y-1 text-yellow-800">
              <li>N'oubliez pas de mentionner la référence : <code className="font-mono font-bold">{instructions.reference}</code></li>
              <li>Le paiement doit être effectué avant le {formatExpiry(instructions.expiresAt)}</li>
              <li>Conservez votre reçu de paiement</li>
              <li>Votre commande sera traitée après confirmation du paiement</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-success/10 border border-success rounded-lg p-4">
        <div className="flex gap-3">
          <span className="text-2xl">✅</span>
          <div className="text-sm">
            <p className="font-semibold text-success-900 mb-1">Après paiement :</p>
            <p className="text-success-800">
              Vous recevrez une confirmation par email et SMS une fois votre paiement validé.
              Votre commande sera alors mise en préparation et expédiée sous 24-48h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
