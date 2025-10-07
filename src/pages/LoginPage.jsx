
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ChefHat, Mail, Lock } from 'lucide-react';

const LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('foodsaas_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      toast({
        title: "Login realizado com sucesso! 🎉",
        description: `Bem-vindo de volta, ${user.name}!`,
      });
      onLogin(user);
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  const handleDemoLogin = (role) => {
    const demoUsers = {
      admin: { id: 'admin-1', name: 'Admin Demo', email: 'admin@foodsaas.com', role: 'admin' },
      restaurant: { id: 'rest-1', name: 'Restaurante Demo', email: 'restaurante@demo.com', role: 'restaurant' },
      client: { id: 'client-1', name: 'Cliente Demo', email: 'cliente@demo.com', role: 'client' }
    };

    toast({
      title: "Login demo realizado! 🎉",
      description: `Entrando como ${demoUsers[role].name}`,
    });
    onLogin(demoUsers[role]);
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
            <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p className="text-gray-600">Entre na sua conta FoodSaaS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary text-white">
              Entrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou teste com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('admin')}
                className="text-xs"
              >
                Admin
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('restaurant')}
                className="text-xs"
              >
                Restaurante
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('client')}
                className="text-xs"
              >
                Cliente
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-orange-500 font-semibold hover:underline"
              >
                Cadastre-se
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

export default LoginPage;
  