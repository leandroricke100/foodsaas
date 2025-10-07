
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ChefHat, Mail, Lock, User, Store } from 'lucide-react';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('foodsaas_users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      toast({
        title: "Email já cadastrado",
        description: "Este email já está em uso",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('foodsaas_users', JSON.stringify(users));

    toast({
      title: "Conta criada com sucesso! 🎉",
      description: "Faça login para continuar",
    });

    onNavigate('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Criar Conta</h1>
            <p className="text-gray-600">Comece grátis no FoodSaaS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Tipo de Conta</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'client' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.role === 'client'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <div className="font-semibold">Cliente</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'restaurant' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.role === 'restaurant'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Store className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <div className="font-semibold">Restaurante</div>
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary text-white">
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-orange-500 font-semibold hover:underline"
              >
                Fazer login
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-gray-500 text-sm hover:underline"
            >
              ← Voltar para home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
  