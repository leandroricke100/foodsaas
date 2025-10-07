
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Search, MapPin, ShoppingCart, User, LogOut, Star, Clock, DollarSign } from 'lucide-react';

const ClientDashboard = ({ user, onLogout, onNavigate, cart, onAddToCart, onRemoveFromCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const mockRestaurants = [
      {
        id: 'rest-1',
        name: 'Pizzaria Bella Napoli',
        category: 'Italiana',
        rating: 4.8,
        deliveryTime: '30-40 min',
        deliveryFee: 5.00,
        image: 'Italian restaurant with wood-fired pizza oven and cozy atmosphere'
      },
      {
        id: 'rest-2',
        name: 'Sushi Master',
        category: 'Japonesa',
        rating: 4.9,
        deliveryTime: '40-50 min',
        deliveryFee: 8.00,
        image: 'Modern Japanese sushi restaurant with fresh fish display'
      },
      {
        id: 'rest-3',
        name: 'Burger House',
        category: 'Hamburguer',
        rating: 4.7,
        deliveryTime: '25-35 min',
        deliveryFee: 4.00,
        image: 'Gourmet burger restaurant with artisan burgers and craft beer'
      },
      {
        id: 'rest-4',
        name: 'Taco Loco',
        category: 'Mexicana',
        rating: 4.6,
        deliveryTime: '35-45 min',
        deliveryFee: 6.00,
        image: 'Colorful Mexican restaurant with tacos and vibrant decor'
      }
    ];

    setRestaurants(mockRestaurants);
  }, []);

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                FoodSaaS
              </h1>
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Entregar em: Rua Principal, 123</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="relative"
                onClick={() => {
                  if (cart.length > 0) {
                    onNavigate('checkout');
                  } else {
                    toast({
                      title: "Carrinho vazio",
                      description: "Adicione itens ao carrinho primeiro",
                    });
                  }
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="gradient-primary py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Olá, {user.name}! 👋
            </h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar restaurantes ou pratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Restaurantes Disponíveis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onNavigate('restaurant-view', restaurant)}
              >
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover" alt={restaurant.name} src="https://images.unsplash.com/photo-1470256699805-a29e1b58598a" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{restaurant.category}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>R$ {restaurant.deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{cart.length} itens no carrinho</p>
              <p className="text-xl font-bold">R$ {cartTotal.toFixed(2)}</p>
            </div>
            <Button
              className="gradient-primary text-white"
              onClick={() => onNavigate('checkout')}
            >
              Ver Carrinho
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
  