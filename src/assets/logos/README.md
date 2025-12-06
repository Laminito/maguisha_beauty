# Logo ADJA Intima

## Emplacement du Logo

Le logo ADJA Intima est disponible sous deux formes :

### 1. Composant SVG React
**Fichier**: `src/assets/logos/AdjaIntimaLogo.tsx`

**Usage**:
```tsx
import AdjaIntimaLogo from './assets/logos/AdjaIntimaLogo';

// Dans votre composant
<AdjaIntimaLogo width={50} height={50} className="optional-class" />
```

**Props disponibles**:
- `width`: largeur du logo (défaut: 200)
- `height`: hauteur du logo (défaut: 200)
- `className`: classes CSS optionnelles

### 2. Image PNG (à ajouter)
Pour utiliser l'image PNG fournie, placez-la dans :
```
public/logo-adja-intima.png
```

Puis utilisez-la avec :
```tsx
<img src="/logo-adja-intima.png" alt="ADJA Intima" className="h-12" />
```

## Caractéristiques du Logo

### Couleurs utilisées
- **Fond dégradé**: #FCD34D (jaune) → #FB923C (orange)
- **Cheveux**: #1E293B (gris foncé/marine)
- **Peau**: #D4A574 (teint naturel)
- **Serviette**: #FFFFFF (blanc)
- **Branche**: #10B981 (vert)
- **Fleurs**: #FCD34D (jaune)
- **Texte ADJA**: #1E293B (gris foncé, gras)
- **Texte Intima**: #1E293B (gris foncé, italique)

### Design
Le logo représente :
- Une silhouette féminine élégante avec des cheveux ondulés
- Une branche d'olivier avec de petites fleurs (symbole de paix et bien-être)
- Un fond circulaire avec dégradé orange/jaune
- Le texte "ADJA" en gras et "Intima" en italique

### Utilisation recommandée
- **Taille minimale**: 40x40px
- **Taille optimale pour header**: 50x50px
- **Taille pour landing page**: 200x200px
- **Fond recommandé**: blanc ou couleurs claires

## Notes
Le logo SVG est vectoriel et s'adapte à toutes les tailles sans perte de qualité. Il utilise les couleurs de la charte graphique ADJA Intima.
