
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, Truck, Package } from 'lucide-react';

const OrderTracking = ({ order, onNavigate }) => {
  const [currentStatus, setCurrentStatus] = useState(order?.status || 'received');

  const statuses = [
    { id: 'received', label: 'Pedido Recebido', icon: CheckCircle },
    { id: 'preparing', label: 'Em Preparo', icon: Package },
    { id: 'on_way', label: 'A Caminho', icon: Truck },
    { id: 'delivered', label: 'Entregue', icon: CheckCircle }
  ];

  const currentIndex = statuses.findIndex(s => s.id === currentStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(prev => {
        const index = statuses.findIndex(s => s.id === prev);
        if (index < statuses.length - 1) {
          return statuses[index + 1].id;
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h1 className="text-2xl font-bold mb-2">Pedido #{order?.id?.slice(-6)}</h1>
            <p className="text-gray-600 mb-6">{order?.restaurantName}</p>

            {/* Status Timeline */}
            <div className="space-y-6">
              {statuses.map((status, index) => {
                const Icon = status.icon;
                const isActive = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <motion.div
                    key={status.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'gradient-primary text-white'
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-orange-200' : ''}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {status.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-orange-500">Em andamento...</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold mb-4">Detalhes do Pedido</h3>
            <div className="space-y-3">
              {order?.items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {order?.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxa de entrega</span>
                  <span>R$ {order?.deliveryFee?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span className="text-orange-500">R$ {order?.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;
  