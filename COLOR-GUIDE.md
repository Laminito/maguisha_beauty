# 🎨 Guide des Couleurs - DjaDja Touradj - Adja Intima

## Palette Principale

### Orange/Jaune (Primary)
```css
/* Utilisé pour les éléments principaux */
amber-500:  #F59E0B  /* Titre, boutons primaires */
amber-600:  #D97706  /* Hover des boutons */
yellow-300: #FCD34D  /* Accents clairs */
```

### Orange Vif (Secondary)  
```css
/* Utilisé pour les éléments secondaires */
orange-400: #FB923C  /* Boutons secondaires */
orange-500: #F97316  /* Accents */
orange-600: #EA580C  /* Hover */
```

### Accent
```css
/* Textes et éléments sombres */
slate-800: #1E293B  /* Texte principal */
gray-600:  #4B5563  /* Texte secondaire */
```

## Utilisation par Composant

### 🛒 Boutons de Réservation

#### Réserver Cash
```tsx
className="bg-gradient-to-r from-orange-600 to-orange-500 
           hover:from-orange-700 hover:to-orange-600 
           text-white shadow-md hover:shadow-lg"
```
**Rendu visuel**: Orange vif, plein et dynamique
**Usage**: Paiement comptant immédiat

#### Réserver Crédit
```tsx
className="bg-gradient-to-r from-amber-500 to-orange-400 
           hover:from-amber-600 hover:to-orange-500 
           text-white shadow-md hover:shadow-lg"
```
**Rendu visuel**: Jaune-orange dégradé, chaleureux
**Usage**: Paiement échelonné (3, 6, 12 mois)

### 📦 Boutons d'Action

#### Bouton Primary (Principal)
```tsx
className="btn-primary"
/* Équivalent à: bg-primary hover:bg-primary-600 text-white */
```
**Couleur**: #F59E0B (Amber-500)
**Usage**: Acheter maintenant, Continuer, Valider

#### Bouton Secondary
```tsx
className="btn-secondary"
/* Équivalent à: bg-secondary hover:bg-secondary-600 text-white */
```
**Couleur**: #FB923C (Orange-400)
**Usage**: Ajouter au panier, Actions secondaires

#### Bouton Outline
```tsx
className="btn-outline"
/* Équivalent à: border-primary text-primary hover:bg-primary */
```
**Couleur**: Bordure orange, fond transparent
**Usage**: Actions tertiaires, Annuler

### 🎯 Gradients

#### Gradient Primary
```css
background: linear-gradient(135deg, #FCD34D 0%, #FB923C 100%)
```
**Usage**: Headers, sections hero, éléments mis en avant

#### Gradient Secondary
```css
background: linear-gradient(135deg, #FB923C 0%, #F59E0B 100%)
```
**Usage**: Sections secondaires, cartes premium

### 📋 États et Messages

#### Information
```tsx
className="bg-orange-50 border border-orange-200 text-orange-800"
```
**Usage**: Messages informatifs, avertissements doux

#### Succès
```tsx
className="bg-green-50 border border-green-200 text-green-800"
```
**Usage**: Confirmations, en stock
**Note**: Le vert reste pour la convention universelle de succès

#### Erreur
```tsx
className="bg-red-50 border border-red-200 text-red-800"
```
**Usage**: Erreurs, rupture de stock
**Note**: Le rouge reste pour la convention d'erreur

### 🏷️ Badges et Tags

#### Badge Recommandé
```tsx
className="badge bg-accent text-white"
/* accent = #F59E0B */
```

#### Badge Prix
```tsx
className="text-primary font-bold"
```

#### Badge Réduction
```tsx
className="bg-secondary text-white"
```

## Principes d'Utilisation

### ✅ À Faire

1. **Cohérence**: Toujours utiliser les couleurs de la palette
2. **Contraste**: S'assurer que le texte blanc est lisible sur les fonds orange
3. **Hiérarchie**: 
   - Primary (orange) = Actions principales
   - Secondary (orange clair) = Actions secondaires
   - Outline = Actions tertiaires

### ❌ À Éviter

1. ❌ Violet, rose, bleu pour les boutons principaux
2. ❌ Vert pour autre chose que "succès/disponible"
3. ❌ Trop de gradients simultanés
4. ❌ Couleurs saturées pour le texte

## Accessibilité

### Ratios de Contraste (WCAG AA)

#### Texte blanc sur fond orange
- Orange-600 (#EA580C): ✅ 4.6:1 (Bon)
- Orange-500 (#F97316): ⚠️ 3.2:1 (Acceptable pour grands textes)
- Amber-500 (#F59E0B): ⚠️ 3.0:1 (Acceptable pour grands textes)

#### Recommandation
Pour du texte de taille normale (< 18px), privilégier:
```tsx
className="bg-orange-600 text-white"  /* Meilleur contraste */
```

Pour du texte large (≥ 18px ou gras ≥ 14px):
```tsx
className="bg-primary text-white"  /* Acceptable */
```

## Exemples d'Intégration

### Carte Produit
```tsx
<div className="card">
  <div className="bg-gradient-primary p-4">
    <h3 className="text-white font-bold">Produit Premium</h3>
  </div>
  <div className="p-4">
    <p className="text-primary font-bold text-2xl">25 000 FCFA</p>
    <button className="btn-primary w-full mt-4">
      Acheter
    </button>
  </div>
</div>
```

### Section Hero
```tsx
<section className="bg-gradient-primary text-white">
  <h1 className="font-heading font-bold text-6xl">
    DjaDja Touradj
  </h1>
  <p className="text-xl opacity-90">
    Beauté, cosmétique et soins
  </p>
</section>
```

### Call-to-Action
```tsx
<div className="bg-orange-50 border-l-4 border-primary p-4">
  <p className="text-orange-800 font-semibold">
    🎉 Ouvert 24 h/24 - Paiement à crédit disponible !
  </p>
</div>
```

## Outils de Vérification

### Palette Tailwind Active
- Primary: amber-500 → orange-600
- Secondary: orange-400 → orange-600
- Accent: slate-800
- Success: green-600 (convention)
- Error: red-600 (convention)

### Classes Personnalisées
```css
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-primary;
}

.btn-primary {
  @apply bg-primary hover:bg-primary-600 text-white;
}

.btn-secondary {
  @apply bg-secondary hover:bg-secondary-600 text-white;
}
```

---

**Dernière mise à jour**: 6 décembre 2025  
**Statut**: ✅ Harmonisé avec la charte de marque
