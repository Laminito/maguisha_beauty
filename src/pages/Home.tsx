import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductList from '../components/products/ProductList';
import { ArrowRightIcon, SparklesIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { featuredProducts, loading, fetchFeaturedProducts } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 animate-fade-in">
              DjaDja Touradj - Adja Intima
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
              Beauté, cosmétique et soins pour sublimer votre bien-être au quotidien.
              <br />
              <span className="font-bold">Ouvert 24 h/24 - Paiement à crédit jusqu'à 12 mois !</span>
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link to="/products" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Découvrir nos produits
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/credit-info" className="btn btn-outline border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                En savoir plus sur le crédit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Qualité Premium</h3>
              <p className="text-gray-600">
                Produits de beauté, cosmétique et soins de haute qualité pour sublimer votre bien-être
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Paiement Flexible</h3>
              <p className="text-gray-600">
                Payez cash ou à crédit sur 3, 6 ou 12 mois avec Kredika. Processus simple et rapide
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Service 24/7</h3>
              <p className="text-gray-600">
                Ouvert 24 h/24. Livraison gratuite à Dakar sous 24-48h. Service professionnel et soigné
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 gradient-text">
              Produits en vedette
            </h2>
            <p className="text-gray-600 text-lg">
              Découvrez notre sélection de produits les plus populaires
            </p>
          </div>

          <ProductList products={featuredProducts} loading={loading} />

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Voir tous les produits
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Credit Info CTA */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            💳 Achetez maintenant, payez plus tard !
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Grâce à notre partenariat avec Kredika, profitez d'un paiement à crédit
            sur 3, 6 ou 12 mois sans tracas. Réponse instantanée !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/credit-info" className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-4">
              Comment ça marche ?
            </Link>
            <Link to="/products" className="btn btn-outline border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              Commencer mes achats
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 gradient-text">
            Nos catégories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              {
                name: 'Beauté',
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500',
                path: '/products?category=beauty',
              },
              {
                name: 'Cosmétique',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
                path: '/products?category=cosmetic',
              },
              {
                name: 'Soins',
                image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500',
                path: '/products?category=care',
              },
              {
                name: 'Lingerie',
                image: 'https://images.unsplash.com/photo-1583225214464-9296029427aa?w=500',
                path: '/products?category=lingerie',
              },
              {
                name: 'Intimes',
                image: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=500',
                path: '/products?category=intimate',
              },
              {
                name: 'Bien-être',
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500',
                path: '/products?category=wellness',
              },
              {
                name: 'Accessoires',
                image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
                path: '/products?category=accessories',
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 md:p-6">
                  <h3 className="font-heading font-bold text-lg md:text-2xl text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 gradient-text">
            Ce que disent nos clientes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aïcha D.',
                rating: 5,
                text: 'Produits de très bonne qualité ! Et le paiement à crédit m\'a vraiment aidée. Je recommande vivement !',
              },
              {
                name: 'Fatou M.',
                rating: 5,
                text: 'Lingerie magnifique et confortable. Livraison rapide, service client au top !',
              },
              {
                name: 'Marième S.',
                rating: 5,
                text: 'Grâce au paiement en 6 mois, j\'ai pu renouveler toute ma garde-robe intime. Merci ADJA Intima !',
              },
            ].map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-primary">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
