
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Star, Clock, DollarSign, Plus, ShoppingCart } from 'lucide-react';

const RestaurantView = ({ restaurant, onNavigate, onAddToCart, cart }) => {
  const { toast } = useToast();
  const [menuItems] = useState([
    {
      id: 'item-1',
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco',
      price: 45.90,
      category: 'Pizzas',
      image: 'Classic margherita pizza with fresh basil and mozzarella'
    },
    {
      id: 'item-2',
      name: 'Pizza Calabresa',
      description: 'Calabresa, cebola, azeitonas, mussarela',
      price: 48.90,
      category: 'Pizzas',
      image: 'Pepperoni pizza with onions and olives'
    },
    {
      id: 'item-3',
      name: 'Lasanha Bolonhesa',
      description: 'Massa fresca, molho bolonhesa, queijo gratinado',
      price: 38.90,
      category: 'Massas',
      image: 'Homemade lasagna with meat sauce and melted cheese'
    },
    {
      id: 'item-4',
      name: 'Tiramisu',
      description: 'Sobremesa italiana clássica com café e mascarpone',
      price: 18.90,
      category: 'Sobremesas',
      image: 'Traditional Italian tiramisu dessert'
    }
  ]);

  const handleAddToCart = (item) => {
    onAddToCart({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    });
    toast({
      title: "Item adicionado! 🎉",
      description: `${item.name} foi adicionado ao carrinho`,
    });
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onNavigate('client-dashboard')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <Button
              variant="ghost"
              className="relative"
              onClick={() => onNavigate('checkout')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Header */}
      <div className="relative h-64 overflow-hidden">
        <img className="w-full h-full object-cover" alt={restaurant.name} src="https://images.unsplash.com/photo-1470256699805-a29e1b58598a" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>R$ {restaurant.deliveryFee.toFixed(2)} entrega</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {menuItems
                .filter(item => item.category === category)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex">
                      <div className="flex-1 p-4">
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-orange-500">
                            R$ {item.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            className="gradient-primary text-white"
                            onClick={() => handleAddToCart(item)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                      </div>
                      <div className="w-32 h-32">
                        <img className="w-full h-full object-cover" alt={item.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantView;
  