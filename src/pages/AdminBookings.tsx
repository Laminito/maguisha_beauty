import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { useBookingStore } from '../store/bookingStore';
import type { Booking } from '../types/booking';
import toast from 'react-hot-toast';

export default function AdminBookings() {
  const { bookings, updateBookingStatus, deleteBooking } = useBookingStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Booking['status'] | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Statistiques
  const stats = useMemo(() => {
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.date === today).length;

    return { pending, confirmed, todayBookings, total: bookings.length };
  }, [bookings]);

  // Filtrage des réservations
  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.phone.includes(query) ||
          b.service.toLowerCase().includes(query)
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    // Filtre par date
    if (dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filtered = filtered.filter((b) => {
        const bookingDate = new Date(b.date);
        bookingDate.setHours(0, 0, 0, 0);

        switch (dateFilter) {
          case 'today':
            return bookingDate.getTime() === today.getTime();
          case 'upcoming':
            return bookingDate >= today;
          case 'past':
            return bookingDate < today;
          default:
            return true;
        }
      });
    }

    // Trier par date et heure (plus récents d'abord)
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }, [bookings, searchQuery, statusFilter, dateFilter]);

  const handleStatusChange = (id: string, status: Booking['status']) => {
    updateBookingStatus(id, status);
    toast.success('Statut mis à jour', { icon: '✅' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      deleteBooking(id);
      toast.success('Réservation supprimée', { icon: '🗑️' });
    }
  };

  const handleWhatsApp = (booking: Booking) => {
    const message = `Bonjour ${booking.name},\n\nVotre rendez-vous pour ${booking.service} le ${booking.date} à ${booking.time} est confirmé !\n\nÀ bientôt chez Magui Beauty Hair 💇‍♀️`;
    const url = `https://wa.me/${booking.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const statusBadge = (status: Booking['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };

    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmé',
      cancelled: 'Annulé',
      completed: 'Terminé',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-2">
                Gestion des Rendez-vous
              </h1>
              <p className="text-gray-600">Magui Beauty Hair - Administration</p>
            </div>
            <Link to="/services" className="btn-primary">
              + Nouveau Rendez-vous
            </Link>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card p-4">
              <div className="text-gray-600 text-sm mb-1">Total</div>
              <div className="text-2xl font-bold gradient-text">{stats.total}</div>
            </div>
            <div className="card p-4">
              <div className="text-gray-600 text-sm mb-1">En attente</div>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <div className="card p-4">
              <div className="text-gray-600 text-sm mb-1">Confirmés</div>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            </div>
            <div className="card p-4">
              <div className="text-gray-600 text-sm mb-1">Aujourd'hui</div>
              <div className="text-2xl font-bold text-blue-600">{stats.todayBookings}</div>
            </div>
          </div>

          {/* Filtres */}
          <div className="card p-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Recherche */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher par nom, téléphone, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Filtre Statut */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Booking['status'] | 'all')}
                  className="input pl-10"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmés</option>
                  <option value="completed">Terminés</option>
                  <option value="cancelled">Annulés</option>
                </select>
                <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Filtre Date */}
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="input pl-10"
                >
                  <option value="all">Toutes les dates</option>
                  <option value="today">Aujourd'hui</option>
                  <option value="upcoming">À venir</option>
                  <option value="past">Passés</option>
                </select>
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Liste des réservations */}
        {filteredBookings.length === 0 ? (
          <div className="card p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Aucune réservation</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
                ? 'Aucune réservation ne correspond à vos filtres'
                : 'Les réservations apparaîtront ici'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Info Client */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{booking.name}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <PhoneIcon className="w-4 h-4" />
                            <a href={`tel:${booking.phone}`} className="hover:text-primary">
                              {booking.phone}
                            </a>
                          </div>
                          {booking.email && (
                            <div className="flex items-center gap-1">
                              <EnvelopeIcon className="w-4 h-4" />
                              <a href={`mailto:${booking.email}`} className="hover:text-primary">
                                {booking.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      {statusBadge(booking.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">Service:</span>
                        <span className="text-gray-700">{booking.service}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{booking.date}</span>
                        <ClockIcon className="w-4 h-4 text-primary ml-2" />
                        <span className="font-semibold">{booking.time}</span>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="flex items-start gap-2">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                          <p className="text-gray-700">{booking.message}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => handleWhatsApp(booking)}
                      className="btn-secondary flex-1 lg:flex-none text-sm whitespace-nowrap"
                      title="Contacter sur WhatsApp"
                    >
                      💬 WhatsApp
                    </button>

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value as Booking['status'])
                      }
                      className="input text-sm flex-1 lg:flex-none"
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmé</option>
                      <option value="completed">Terminé</option>
                      <option value="cancelled">Annulé</option>
                    </select>

                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="btn-secondary bg-red-50 text-red-600 hover:bg-red-100 flex-1 lg:flex-none"
                      title="Supprimer"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer - Date de création */}
                <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                  Créé le {new Date(booking.createdAt).toLocaleString('fr-FR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
