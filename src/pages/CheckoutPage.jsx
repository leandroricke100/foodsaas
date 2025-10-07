
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Trash2, CreditCard, Smartphone } from 'lucide-react';

const CheckoutPage = ({ cart, restaurant, user, onNavigate, onClearCart }) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [address, setAddress] = useState('Rua Principal, 123');

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = restaurant?.deliveryFee || 5.00;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      restaurantId: restaurant?.id,
      restaurantName: restaurant?.name,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      address,
      paymentMethod,
      status: 'received',
      createdAt: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('foodsaas_orders') || '[]');
    orders.push(order);
    localStorage.setItem('foodsaas_orders', JSON.stringify(orders));

    toast({
      title: "Pedido realizado com sucesso! 🎉",
      description: "Acompanhe o status do seu pedido",
    });

    onClearCart();
    onNavigate('order-tracking', order);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Carrinho vazio</h2>
          <Button onClick={() => onNavigate('client-dashboard')}>
            Voltar para restaurantes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => onNavigate('client-dashboard')}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Order Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Seu Pedido</h2>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-bold mb-4">{restaurant?.name}</h3>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxa de entrega</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-orange-500">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold mb-4">Endereço de Entrega</h3>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Digite seu endereço"
              />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Pagamento</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Label className="mb-4 block">Método de Pagamento</Label>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('credit')}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'credit'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-orange-500" />
                  <div className="text-left">
                    <div className="font-semibold">Cartão de Crédito</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, Elo</div>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'pix'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-orange-500" />
                  <div className="text-left">
                    <div className="font-semibold">PIX</div>
                    <div className="text-sm text-gray-600">Pagamento instantâneo</div>
                  </div>
                </button>
              </div>

              <Button
                className="w-full mt-6 gradient-primary text-white text-lg h-12"
                onClick={handlePlaceOrder}
              >
                Finalizar Pedido - R$ {total.toFixed(2)}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
  