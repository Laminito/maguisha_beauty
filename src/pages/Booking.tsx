import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useBookingStore } from '../store/bookingStore';

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get('service') || '';
  const addBooking = useBookingStore((state) => state.addBooking);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: serviceName,
    date: '',
    time: '',
    message: '',
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer le message WhatsApp
    const message = `Bonjour Magui Beauty Hair,\n\nJe souhaite prendre rendez-vous :\n\n👤 Nom : ${formData.name}\n📞 Téléphone : ${formData.phone}${formData.email ? `\n📧 Email : ${formData.email}` : ''}\n💇‍♀️ Service : ${formData.service}\n📅 Date : ${formData.date}\n🕐 Heure : ${formData.time}${formData.message ? `\n💬 Message : ${formData.message}` : ''}\n\nMerci !`;

    const whatsappUrl = `https://wa.me/221777269519?text=${encodeURIComponent(message)}`;
    
    // Enregistrer la réservation dans le store
    addBooking({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      message: formData.message || undefined,
    });
    
    toast.success('Réservation enregistrée ! Redirection vers WhatsApp...', {
      icon: '✅',
      duration: 2000,
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Date minimum (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Retour aux services
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 gradient-text">
              Prendre Rendez-vous
            </h1>
            <p className="text-gray-600">
              Remplissez le formulaire ci-dessous et nous vous contacterons sur WhatsApp
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Nom complet <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input pl-10"
                  placeholder="Votre nom complet"
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                Téléphone <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input pl-10"
                  placeholder="+221 77 123 45 67"
                />
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Email (optionnel) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email (optionnel)
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="votre@email.com"
                />
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-semibold mb-2">
                Service souhaité <span className="text-error">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Sélectionnez un service</option>
                <optgroup label="Services Phares">
                  <option value="Steampod - Lissage Vapeur">Steampod - Lissage Vapeur</option>
                  <option value="Bouclage Professionnel">Bouclage Professionnel</option>
                  <option value="Customization Perruque">Customization Perruque</option>
                </optgroup>
                <optgroup label="Coiffure">
                  <option value="Coiffure Simple">Coiffure Simple</option>
                  <option value="Défrisage Complet">Défrisage Complet</option>
                  <option value="Coloration + Mèches">Coloration + Mèches</option>
                  <option value="Coupe + Brushing">Coupe + Brushing</option>
                  <option value="Lissage Brésilien">Lissage Brésilien</option>
                </optgroup>
                <optgroup label="Tressage">
                  <option value="Tresses Collées Simples">Tresses Collées Simples</option>
                  <option value="Vanilles">Vanilles</option>
                  <option value="Box Braids">Box Braids</option>
                  <option value="Fulani Braids">Fulani Braids</option>
                  <option value="Crochet Braids">Crochet Braids</option>
                  <option value="Nattes Couchées">Nattes Couchées</option>
                </optgroup>
                <optgroup label="Perruques">
                  <option value="Pose de Perruque Classique">Pose de Perruque Classique</option>
                  <option value="Pose Perruque + Customisation">Pose Perruque + Customisation</option>
                  <option value="Installation Wig avec Colle">Installation Wig avec Colle</option>
                  <option value="Entretien Perruque">Entretien Perruque</option>
                </optgroup>
                <optgroup label="Tissages">
                  <option value="Pose Tissage Cousu">Pose Tissage Cousu</option>
                  <option value="Quick Weave (Collé)">Quick Weave (Collé)</option>
                  <option value="Closure + Tissage">Closure + Tissage</option>
                  <option value="Frontal + Tissage">Frontal + Tissage</option>
                </optgroup>
                <optgroup label="Soins">
                  <option value="Soin Profond Hydratant">Soin Profond Hydratant</option>
                  <option value="Soin à la Kératine">Soin à la Kératine</option>
                  <option value="Bain d'Huile">Bain d'Huile</option>
                </optgroup>
                <optgroup label="Manucure/Pédicure">
                  <option value="Manucure Simple">Manucure Simple</option>
                  <option value="Pose Gel">Pose Gel</option>
                  <option value="Nail Art">Nail Art</option>
                  <option value="Pédicure Complète">Pédicure Complète</option>
                </optgroup>
                <optgroup label="Beauté & Maquillage">
                  <option value="Maquillage Jour">Maquillage Jour</option>
                  <option value="Maquillage Soirée">Maquillage Soirée</option>
                  <option value="Maquillage Mariée">Maquillage Mariée</option>
                  <option value="Soin Visage Complet">Soin Visage Complet</option>
                </optgroup>
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold mb-2">
                Date souhaitée <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="input pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Heure */}
            <div>
              <label htmlFor="time" className="block text-sm font-semibold mb-2">
                Heure souhaitée <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input pl-10"
                >
                  <option value="">Choisir une heure</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Horaires : Lundi - Samedi, 9h - 20h
              </p>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message (optionnel)
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input pl-10 pt-3"
                  placeholder="Précisions sur votre rendez-vous..."
                />
                <ChatBubbleLeftRightIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Bouton Submit */}
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Envoyer la demande sur WhatsApp
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              📱 Après validation, vous serez redirigé vers WhatsApp pour finaliser votre réservation avec Magui Beauty Hair
            </p>
          </div>
        </div>

        {/* Contact Direct */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Vous préférez nous contacter directement ?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+221777269519"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              77 726 95 19
            </a>
            <a
              href="https://instagram.com/maguisha94"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              📸 @maguisha94
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
