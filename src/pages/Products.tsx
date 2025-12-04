import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import type { ProductFilter, ProductCategory } from '../types/product';
import ProductList from '../components/products/ProductList';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default function Products() {
  const { products, loading, fetchProducts, setFilter } = useProductStore();
  const [showFilters, setShowFilters] = useState(false);
  const [localFilter, setLocalFilter] = useState<ProductFilter>({});

  useEffect(() => {
    // Parse URL query params
    const params = new URLSearchParams(window.location.search);
    const filter: ProductFilter = {};
    
    if (params.get('category')) filter.category = params.get('category') as ProductCategory;
    if (params.get('search')) filter.search = params.get('search') as string;
    if (params.get('minPrice')) filter.minPrice = parseInt(params.get('minPrice')!);
    if (params.get('maxPrice')) filter.maxPrice = parseInt(params.get('maxPrice')!);
    if (params.get('brand')) filter.brand = params.get('brand') as string;
    if (params.get('sortBy')) filter.sortBy = params.get('sortBy') as any;

    setLocalFilter(filter);
    fetchProducts(filter);
  }, [fetchProducts]);

  const handleFilterChange = (updates: Partial<ProductFilter>) => {
    const newFilter = { ...localFilter, ...updates };
    setLocalFilter(newFilter);
    setFilter(newFilter);
    fetchProducts(newFilter);
  };

  const clearFilters = () => {
    setLocalFilter({});
    setFilter({});
    fetchProducts({});
  };

  const hasActiveFilters = Object.keys(localFilter).length > 0;

  const categories: { value: ProductCategory; label: string }[] = [
    { value: 'wigs', label: 'Perruques' },
    { value: 'weaves', label: 'Tissages' },
    { value: 'extensions', label: 'Extensions' },
    { value: 'hair-care', label: 'Soins Capillaires' },
    { value: 'lingerie', label: 'Lingerie' },
    { value: 'sleepwear', label: 'Vêtements de Nuit' },
    { value: 'accessories', label: 'Accessoires' },
    { value: 'beauty', label: 'Beauté & Cosmétiques' },
    { value: 'intimate', label: 'Sous-vêtements Intimes' },
    { value: 'wellness', label: 'Bien-Être & Santé' },
  ];

  const brands = [
    'Beauty Hair Premium', 
    'Luxury Hair', 
    'Natural Beauty', 
    'Organic Hair Care',
    'Femme Élégante',
    'Séduction Lingerie',
    'Nuit Douce',
    'Glam Beauty',
    'Pro Makeup',
    'Glow Skin',
    'Pleasure Plus',
    'Sensual Touch',
    'Intimate Care',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4 gradient-text">
            Nos Produits
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-600">
              {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
            </p>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center gap-2 md:hidden"
            >
              <FunnelIcon className="w-5 h-5" />
              Filtres
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl">Filtres</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-error hover:text-error/80 transition-colors"
                  >
                    Effacer tout
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Catégorie</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={localFilter.category === cat.value}
                        onChange={() => handleFilterChange({ category: cat.value })}
                        className="mr-2"
                      />
                      <span className="text-sm">{cat.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!localFilter.category}
                      onChange={() => handleFilterChange({ category: undefined })}
                      className="mr-2"
                    />
                    <span className="text-sm">Toutes</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Prix (FCFA)</h3>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilter.minPrice || ''}
                    onChange={(e) => handleFilterChange({ minPrice: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="input text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilter.maxPrice || ''}
                    onChange={(e) => handleFilterChange({ maxPrice: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="input text-sm"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Marque</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        checked={localFilter.brand === brand}
                        onChange={() => handleFilterChange({ brand })}
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      checked={!localFilter.brand}
                      onChange={() => handleFilterChange({ brand: undefined })}
                      className="mr-2"
                    />
                    <span className="text-sm">Toutes</span>
                  </label>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold mb-3">Trier par</h3>
                <select
                  value={localFilter.sortBy || ''}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                  className="input text-sm"
                >
                  <option value="">Par défaut</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name">Nom</option>
                  <option value="popularity">Popularité</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <ProductList products={products} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}
