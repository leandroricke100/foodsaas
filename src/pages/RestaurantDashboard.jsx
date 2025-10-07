
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Settings, LogOut, TrendingUp, DollarSign, Package } from 'lucide-react';

const RestaurantDashboard = ({ user, onLogout, onNavigate }) => {
  const { toast } = useToast();
  const [stats] = useState({
    todayOrders: 24,
    todayRevenue: 1847.50,
    pendingOrders: 5,
    totalProducts: 32
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Painel do Restaurante
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Olá, {user.name}</span>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pedidos Hoje</span>
              <ShoppingBag className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold">{stats.todayOrders}</p>
            <p className="text-sm text-green-500 mt-1">+12% vs ontem</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Faturamento Hoje</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold">R$ {stats.todayRevenue.toFixed(2)}</p>
            <p className="text-sm text-green-500 mt-1">+8% vs ontem</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pedidos Pendentes</span>
              <Package className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
            <p className="text-sm text-gray-500 mt-1">Requer atenção</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Produtos Ativos</span>
              <UtensilsCrossed className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            <p className="text-sm text-gray-500 mt-1">No cardápio</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="menu">Cardápio</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Pedidos Recentes</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Pedido #{1000 + i}</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Em preparo
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">2 itens • R$ 67.80</p>
                    <Button
                      size="sm"
                      className="mt-3"
                      onClick={() => toast({
                        title: "🚧 Recurso em desenvolvimento",
                        description: "A gestão completa de pedidos estará disponível em breve!",
                      })}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Gerenciar Cardápio</h3>
                <Button
                  className="gradient-primary text-white"
                  onClick={() => toast({
                    title: "🚧 Recurso em desenvolvimento",
                    description: "A edição de cardápio estará disponível em breve!",
                  })}
                >
                  Adicionar Produto
                </Button>
              </div>
              <p className="text-gray-600">Gerencie seus produtos, preços e disponibilidade</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Análises e Relatórios</h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Gráficos e métricas em breve</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Configurações do Restaurante</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Informações Básicas</h4>
                  <p className="text-gray-600">Nome, endereço, horário de funcionamento</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Plano Atual</h4>
                  <p className="text-gray-600">Plano Gratuito • Upgrade disponível</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => toast({
                      title: "🚧 Recurso em desenvolvimento",
                      description: "O upgrade de plano estará disponível em breve!",
                    })}
                  >
                    Ver Planos
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
  