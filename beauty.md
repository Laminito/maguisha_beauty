# 🎀 Instructions - Application Beauty Hair E-Commerce avec Kredika Credit

## 📋 Vue d'ensemble du projet

Créer une application React moderne pour une boutique de cheveux naturels avec :
- ✅ Vente directe (paiement cash)
- ✅ Vente à crédit (intégration Kredika Core SaaS)
- ✅ Catalogue produits
- ✅ Panier d'achat
- ✅ Gestion des commandes

---

## 🚀 Prompt pour GitHub Copilot

```
Create a complete React e-commerce application for "Beauty Hair" - a natural hair products shop.

REQUIREMENTS:

1. TECH STACK:
   - React 18+ with TypeScript
   - Vite for build tool
   - Tailwind CSS for styling
   - React Router for navigation
   - Zustand for state management
   - Axios for API calls

2. KREDIKA CREDIT INTEGRATION:
   - Partner API Base URL: http://localhost:7575/api/v1
   - Partner Credentials:
     * Client ID: pk_6c5c0cba8e854dac
     * Client Secret: kred_K1z5gceu7zdLAAnyaZF4fwROppp
   - Implement credit reservation flow
   - Payment methods configuration

3. CORE FEATURES:

   A. AUTHENTICATION:
      - Customer registration/login
      - Partner authentication for admin panel
      - JWT token management

   B. PRODUCT CATALOG:
      - Product listing with filters (type, price, brand)
      - Product categories: Wigs, Weaves, Extensions, Hair Care
      - Product details page
      - Image gallery
      - Search functionality

   C. SHOPPING CART:
      - Add/remove products
      - Update quantities
      - Calculate totals
      - Persist cart in localStorage

   D. CHECKOUT PROCESS:
      - Customer information form
      - Delivery address
      - Payment method selection:
        * Cash payment (direct purchase)
        * Credit payment (Kredika integration)
      - Order confirmation

   E. CREDIT PAYMENT FLOW:
      - Check credit eligibility via Kredika API
      - Create credit reservation
      - Select payment plan (3, 6, 12 months)
      - Generate payment instructions
      - Display payment methods (Mobile Money, Bank Transfer)

   F. ORDER MANAGEMENT:
      - Order history
      - Order status tracking
      - Invoice generation

   G. ADMIN PANEL:
      - Product management (CRUD)
      - Order management
      - Customer management
      - Credit reservations dashboard
      - Sales analytics

4. API INTEGRATION:

   Kredika Partner API Endpoints:
   - POST /auth/token - Partner authentication
   - POST /credit-reservations - Create credit reservation
   - GET /credit-reservations - List reservations
   - GET /credit-reservations/{id} - Get reservation details
   - POST /payment-instructions - Generate payment instructions
   - GET /installments - Get payment schedules

5. DATA MODELS:

   Product:
   - id, name, description, price, category, brand
   - images[], stock, featured, ratings

   Customer:
   - id, firstName, lastName, email, phone
   - address {street, city, postalCode}

   Order:
   - id, customerId, products[], totalAmount
   - paymentMethod (CASH/CREDIT)
   - status, createdAt, deliveryAddress

   CreditReservation:
   - reservationId, orderId, customerId
   - amount, duration, status
   - installments[], paymentInstructions

6. UI/UX REQUIREMENTS:
   - Modern, responsive design (mobile-first)
   - Professional color scheme: Purple/Pink gradient
   - Smooth animations and transitions
   - Loading states and error handling
   - Toast notifications
   - Accessible components

7. PROJECT STRUCTURE:
   ```
   src/
   ├── components/
   │   ├── layout/
   │   │   ├── Header.tsx
   │   │   ├── Footer.tsx
   │   │   └── Sidebar.tsx
   │   ├── products/
   │   │   ├── ProductCard.tsx
   │   │   ├── ProductList.tsx
   │   │   ├── ProductDetail.tsx
   │   │   └── ProductFilter.tsx
   │   ├── cart/
   │   │   ├── CartItem.tsx
   │   │   ├── CartSummary.tsx
   │   │   └── CartDrawer.tsx
   │   ├── checkout/
   │   │   ├── CheckoutForm.tsx
   │   │   ├── PaymentMethod.tsx
   │   │   └── OrderSummary.tsx
   │   ├── credit/
   │   │   ├── CreditEligibility.tsx
   │   │   ├── CreditPlanSelector.tsx
   │   │   ├── PaymentInstructions.tsx
   │   │   └── InstallmentSchedule.tsx
   │   └── admin/
   │       ├── Dashboard.tsx
   │       ├── ProductManager.tsx
   │       └── OrderManager.tsx
   ├── pages/
   │   ├── Home.tsx
   │   ├── Products.tsx
   │   ├── ProductDetails.tsx
   │   ├── Cart.tsx
   │   ├── Checkout.tsx
   │   ├── Orders.tsx
   │   ├── Login.tsx
   │   └── admin/
   ├── services/
   │   ├── api.ts
   │   ├── authService.ts
   │   ├── productService.ts
   │   ├── orderService.ts
   │   └── kredikaService.ts
   ├── store/
   │   ├── cartStore.ts
   │   ├── authStore.ts
   │   └── productStore.ts
   ├── types/
   │   ├── product.ts
   │   ├── order.ts
   │   └── kredika.ts
   └── utils/
       ├── currency.ts
       └── validation.ts
   ```

8. KEY COMPONENTS TO IMPLEMENT:

   A. KredikaService (services/kredikaService.ts):
   ```typescript
   - authenticatePartner()
   - createCreditReservation(orderData)
   - getCreditReservations()
   - generatePaymentInstructions(reservationId)
   - getInstallmentSchedule(reservationId)
   ```

   B. CheckoutFlow:
   - Step 1: Customer info
   - Step 2: Delivery address
   - Step 3: Payment method (Cash/Credit)
   - Step 4: If Credit -> Credit plan selection
   - Step 5: Confirmation

   C. ProductCatalog:
   - Grid/List view toggle
   - Category filters
   - Price range filter
   - Sort by (price, name, popularity)
   - Pagination

9. SAMPLE PRODUCTS DATA:

   Categories:
   - Perruques (Wigs)
   - Tissages (Weaves)
   - Extensions
   - Soins Capillaires (Hair Care)

   Example products:
   - "Perruque Brésilienne Lisse" - 45,000 FCFA
   - "Tissage Péruvien Bouclé" - 35,000 FCFA
   - "Extension Naturelle 24 pouces" - 28,000 FCFA
   - "Shampoing Hydratant Bio" - 8,500 FCFA

10. CREDIT PAYMENT FLOW:

    Step 1: Customer selects products
    Step 2: Chooses "Credit" at checkout
    Step 3: System checks eligibility with Kredika
    Step 4: Customer selects payment plan (3/6/12 months)
    Step 5: Create credit reservation via Kredika API
    Step 6: Generate payment instructions
    Step 7: Display first installment payment methods
    Step 8: Customer completes first payment
    Step 9: Order confirmed and processed

11. IMPORTANT FEATURES:

    - Cart persistence (localStorage)
    - Product image zoom/gallery
    - Product reviews and ratings
    - Wishlist functionality
    - Order tracking
    - Email notifications (simulation)
    - Receipt/Invoice download (PDF)
    - Mobile-responsive design
    - Dark mode support
    - Multi-language (French/English)

12. SECURITY:

    - Secure API token storage
    - Input validation
    - XSS protection
    - CSRF tokens
    - Secure checkout process

13. TESTING:

    - Unit tests for services
    - Integration tests for checkout flow
    - E2E tests for critical paths

Build a complete, production-ready application with all these features.
Use modern React patterns, hooks, and best practices.
Implement proper error handling and loading states.
Make it beautiful, fast, and user-friendly.
```

---

## 🎯 Configuration Kredika

### Informations Partner

```json
{
  "partnerId": "355a950b-994c-430a-ab2d-a021e1bc11de",
  "partnerName": "Beauty Hair Shop",
  "clientId": "pk_6c5c0cba8e854dac",
  "clientSecret": "kred_K1z5gceu7zdLAAnyaZF4fwROppp",
  "apiBaseUrl": "http://localhost:7575/api/v1"
}
```

### Exemple d'intégration

```typescript
// services/kredikaService.ts
import axios from 'axios';

const KREDIKA_API = 'http://localhost:7575/api/v1';

class KredikaService {
  private token: string | null = null;

  async authenticate() {
    const response = await axios.post(`${KREDIKA_API}/auth/token`, {
      clientId: 'pk_6c5c0cba8e854dac',
      clientSecret: 'kred_K1z5gceu7zdLAAnyaZF4fwROppp'
    });
    this.token = response.data.accessToken;
    return this.token;
  }

  async createReservation(orderData: any) {
    if (!this.token) await this.authenticate();
    
    const response = await axios.post(
      `${KREDIKA_API}/credit-reservations`,
      {
        customerFirstName: orderData.customer.firstName,
        customerLastName: orderData.customer.lastName,
        customerEmail: orderData.customer.email,
        customerPhone: orderData.customer.phone,
        creditAmount: orderData.totalAmount,
        durationMonths: orderData.creditPlan,
        purchaseDescription: `Achat Beauty Hair - Commande #${orderData.orderId}`
      },
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    
    return response.data;
  }

  async getPaymentInstructions(reservationId: string) {
    if (!this.token) await this.authenticate();
    
    const response = await axios.post(
      `${KREDIKA_API}/payment-instructions`,
      { reservationId },
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    
    return response.data;
  }
}

export default new KredikaService();
```

---

## 📦 Structure du Projet

```
beauty-hair-app/
├── public/
│   ├── images/
│   │   └── products/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 Design Guidelines

### Palette de couleurs

```css
:root {
  --primary: #9333EA; /* Purple */
  --secondary: #EC4899; /* Pink */
  --accent: #F59E0B; /* Amber */
  --success: #10B981; /* Green */
  --error: #EF4444; /* Red */
  --dark: #1F2937;
  --light: #F9FAFB;
}
```

### Typographie

- Headings: Poppins, sans-serif
- Body: Inter, sans-serif

---

## 🛒 Flux d'achat

### Achat Cash (Direct)

1. Client ajoute produits au panier
2. Va au checkout
3. Sélectionne "Paiement Cash"
4. Entre informations de livraison
5. Confirme la commande
6. Reçoit confirmation
7. Paie à la livraison

### Achat à Crédit (Kredika)

1. Client ajoute produits au panier
2. Va au checkout
3. Sélectionne "Paiement à Crédit"
4. Système vérifie éligibilité
5. Client choisit plan (3/6/12 mois)
6. Système crée réservation Kredika
7. Génère instructions de paiement
8. Client voit montant 1ère échéance
9. Client choisit méthode (Mobile Money/Virement)
10. Client effectue 1er paiement
11. Commande confirmée

---

## 📱 Features Principales

### Page d'accueil
- Hero section avec promotion
- Produits en vedette
- Catégories populaires
- Témoignages clients
- FAQ sur le crédit

### Catalogue Produits
- Filtres : Catégorie, Prix, Marque
- Tri : Prix, Popularité, Nouveautés
- Recherche
- Vue grille/liste
- Quick view modal

### Détail Produit
- Galerie d'images
- Description détaillée
- Spécifications
- Avis clients
- Produits similaires
- Options de paiement visibles

### Panier
- Liste des produits
- Quantités ajustables
- Calcul total
- Code promo
- Estimation livraison
- Bouton "Payer Cash" ou "Payer à Crédit"

### Checkout
- Formulaire client
- Adresse livraison
- Choix paiement
- Récapitulatif
- Confirmation

### Mon Compte
- Profil
- Commandes
- Crédits en cours
- Adresses
- Wishlist

### Admin Panel
- Dashboard analytique
- Gestion produits
- Gestion commandes
- Gestion clients
- Réservations crédit
- Rapports

---

## 🔐 Sécurité

### Stockage sécurisé

```typescript
// Utiliser des variables d'environnement
const config = {
  kredikaApiUrl: import.meta.env.VITE_KREDIKA_API_URL,
  kredikaClientId: import.meta.env.VITE_KREDIKA_CLIENT_ID,
  kredikaClientSecret: import.meta.env.VITE_KREDIKA_CLIENT_SECRET
};
```

### Validation

```typescript
// Validation des formulaires avec Zod ou Yup
import { z } from 'zod';

const customerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^(77|78|70|76|75)\d{7}$/),
  address: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    postalCode: z.string().optional()
  })
});
```

---

## 📊 Analytics & Tracking

### Événements à tracker

- Page views
- Product views
- Add to cart
- Remove from cart
- Checkout initiated
- Payment method selected
- Order completed
- Credit application started
- Credit approved
- Credit payment completed

---

## 🚀 Déploiement

### Build Production

```bash
npm run build
```

### Variables d'environnement

```env
VITE_KREDIKA_API_URL=https://api.kredika.sn/api/v1
VITE_KREDIKA_CLIENT_ID=pk_6c5c0cba8e854dac
VITE_KREDIKA_CLIENT_SECRET=kred_K1z5gceu7zdLAAnyaZF4fwROppp
VITE_API_URL=https://api.beautyhair.sn
```

---

## 📝 Notes importantes

1. **Token Kredika** : Le token Partner doit être renouvelé toutes les 24h
2. **Réservations** : Créer une réservation ne débite pas le crédit, il faut confirmer le 1er paiement
3. **Webhooks** : Implémenter des webhooks pour recevoir les notifications de paiement
4. **Mobile Money** : Intégrer Orange Money, Wave, Free Money
5. **Email** : Configurer les emails de confirmation (SendGrid/Mailgun)
6. **SMS** : Notifications SMS pour les étapes importantes
7. **Images** : Optimiser les images (WebP, lazy loading)
8. **Cache** : Mettre en cache les produits et catégories
9. **SEO** : Optimiser pour les moteurs de recherche
10. **Performance** : Lazy load, code splitting, compression

---

## 🎯 MVP (Minimum Viable Product)

**Phase 1 - Semaine 1-2** :
- ✅ Setup projet React + Tailwind
- ✅ Authentification basique
- ✅ Catalogue produits
- ✅ Détail produit
- ✅ Panier

**Phase 2 - Semaine 3** :
- ✅ Checkout cash
- ✅ Intégration Kredika auth
- ✅ Création réservation crédit
- ✅ Affichage instructions paiement

**Phase 3 - Semaine 4** :
- ✅ Admin panel
- ✅ Gestion commandes
- ✅ Dashboard analytics
- ✅ Tests et déploiement

---

## 🆘 Support

Pour toute question sur l'intégration Kredika :
- Documentation : [BACKEND_REQUIREMENTS.md]
- API Docs : http://localhost:7575/swagger-ui.html
- Support : dev@kredika.sn

---

## ✨ Améliorations futures

- [ ] Application mobile (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Chat support client
- [ ] Programme fidélité
- [ ] Recommandations IA
- [ ] AR/VR pour essai virtuel perruques
- [ ] Blog beauté
- [ ] Tutoriels vidéo
- [ ] Marketplace multi-vendeurs
- [ ] Abonnements mensuels

---

**Bonne création ! 🚀**
