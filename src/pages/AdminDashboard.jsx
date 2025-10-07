
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Store, DollarSign, TrendingUp, LogOut, Settings } from 'lucide-react';

const AdminDashboard = ({ user, onLogout, onNavigate }) => {
  const { toast } = useToast();
  const [stats] = useState({
    totalRestaurants: 47,
    totalUsers: 1523,
    monthlyRevenue: 45780.00,
    commission: 6867.00
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Admin: {user.name}</span>
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
              <span className="text-gray-600">Restaurantes</span>
              <Store className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold">{stats.totalRestaurants}</p>
            <p className="text-sm text-green-500 mt-1">+5 este mês</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Usuários</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-sm text-green-500 mt-1">+127 este mês</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Receita Mensal</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold">R$ {stats.monthlyRevenue.toFixed(2)}</p>
            <p className="text-sm text-green-500 mt-1">+18% vs mês anterior</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Comissão</span>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold">R$ {stats.commission.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">15% média</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="restaurants">Restaurantes</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Gerenciar Restaurantes</h3>
                <Button
                  className="gradient-primary text-white"
                  onClick={() => toast({
                    title: "🚧 Recurso em desenvolvimento",
                    description: "O cadastro de restaurantes estará disponível em breve!",
                  })}
                >
                  Adicionar Restaurante
                </Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Restaurante {i}</h4>
                      <p className="text-sm text-gray-600">Plano Premium • 234 pedidos este mês</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast({
                        title: "🚧 Recurso em desenvolvimento",
                        description: "A edição de restaurantes estará disponível em breve!",
                      })}
                    >
                      Editar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Gerenciar Usuários</h3>
              <p className="text-gray-600">Lista de todos os usuários cadastrados na plataforma</p>
            </div>
          </TabsContent>

          <TabsContent value="plans">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Gerenciar Planos</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {['Gratuito', 'Premium', 'Enterprise'].map((plan) => (
                  <div key={plan} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold mb-2">{plan}</h4>
                    <p className="text-sm text-gray-600 mb-4">Configurar recursos e preços</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast({
                        title: "🚧 Recurso em desenvolvimento",
                        description: "A edição de planos estará disponível em breve!",
                      })}
                    >
                      Editar Plano
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Relatórios e Análises</h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Relatórios detalhados em breve</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
  