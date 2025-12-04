import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ScissorsIcon, 
  SparklesIcon, 
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import type { ServiceCategory } from '../types/service';
import { mockServices } from '../data/mockServices';
import { formatCurrency } from '../utils/currency';

export default function Services() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories: { value: ServiceCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'Tous les services', icon: '✨' },
    { value: 'coiffure', label: 'Coiffure', icon: '💇‍♀️' },
    { value: 'tressage', label: 'Tressage', icon: '🎀' },
    { value: 'perruques', label: 'Perruques', icon: '👩' },
    { value: 'tissages', label: 'Tissages', icon: '💫' },
    { value: 'soins', label: 'Soins Capillaires', icon: '🌿' },
    { value: 'manucure', label: 'Manucure/Pédicure', icon: '💅' },
    { value: 'beaute', label: 'Beauté & Maquillage', icon: '💄' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? mockServices 
    : mockServices.filter(service => service.category === selectedCategory);

  const handleBooking = (serviceName: string) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ScissorsIcon className="w-10 h-10" />
              </div>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              MAGUI BEAUTY HAIR
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              "Un look qui vous ressemble, une beauté qui vous sublime !"
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Sublimez votre beauté, révélez votre éclat ! Steampod, bouclage, customization, pose perruque, makeup.
            </p>
          </div>
        </div>
      </section>

      {/* Informations Contact */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <PhoneIcon className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold">Téléphone</div>
                <div className="text-gray-600">+221 77 726 95 19</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPinIcon className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold">Adresse</div>
                <div className="text-gray-600">Pikine, Dakar, Sénégal</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ClockIcon className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold">Horaires</div>
                <div className="text-gray-600">Lun-Sam: 9h-20h</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
              <a 
                href="https://instagram.com/maguisha94" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold"
              >
                <span>📸</span> Instagram: @maguisha94
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a 
                href="https://tiktok.com/@maguibeautyhair" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
              >
                <span>🎵</span> TikTok: @maguibeautyhair
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres Catégories */}
      <section className="bg-white py-6 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.value
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-3xl gradient-text mb-2">
              {categories.find(c => c.value === selectedCategory)?.label || 'Tous les services'}
            </h2>
            <p className="text-gray-600">
              {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} disponible{filteredServices.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="card group hover:shadow-xl transition-shadow">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {service.popular && (
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-accent text-white flex items-center gap-1">
                        <SparklesIcon className="w-4 h-4" />
                        Populaire
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <ClockIcon className="w-4 h-4 text-primary" />
                      {service.duration} min
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Inclus */}
                  {service.includes && service.includes.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Ce service inclut:</div>
                      <div className="flex flex-wrap gap-2">
                        {service.includes.map((item, index) => (
                          <span
                            key={index}
                            className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prix */}
                  <div className="flex items-center justify-between mb-4 pt-4 border-t">
                    <div className="text-2xl font-bold gradient-text">
                      {formatCurrency(service.price)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {service.duration} minutes
                    </div>
                  </div>

                  {/* Bouton Réservation */}
                  <button
                    onClick={() => handleBooking(service.name)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <CalendarIcon className="w-5 h-5" />
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl text-center mb-12 gradient-text">
            Pourquoi choisir Maguisha Beauty Salon ?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Professionnelles</h3>
              <p className="text-gray-600">
                Équipe expérimentée et formée aux dernières techniques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ScissorsIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Qualité Premium</h3>
              <p className="text-gray-600">
                Produits de haute qualité pour des résultats durables
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Ponctualité</h3>
              <p className="text-gray-600">
                Respect des horaires de rendez-vous garantis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Localisation</h3>
              <p className="text-gray-600">
                Pikine - Salon facile d'accès
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Réservation */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Prête à vous faire chouchouter ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Réservez votre rendez-vous dès maintenant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+221777269519"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow"
            >
              📞 77 726 95 19
            </a>
            <a
              href="https://wa.me/221777269519"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow"
            >
              💬 WhatsApp
            </a>
            <a
              href="https://instagram.com/maguisha94"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow"
            >
              📸 @maguisha94
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
