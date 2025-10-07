
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChefHat, Store, Users, TrendingUp, Shield, Zap, Check, ArrowRight } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const features = [
    {
      icon: Store,
      title: 'Multi-Restaurantes',
      description: 'Gerencie múltiplos restaurantes em uma única plataforma'
    },
    {
      icon: Users,
      title: 'Gestão de Clientes',
      description: 'Sistema completo de cadastro e fidelização de clientes'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avançado',
      description: 'Dashboards com métricas em tempo real e relatórios detalhados'
    },
    {
      icon: Shield,
      title: 'Pagamentos Seguros',
      description: 'Integração com múltiplos métodos de pagamento'
    },
    {
      icon: Zap,
      title: 'Pedidos em Tempo Real',
      description: 'Acompanhamento instantâneo do status dos pedidos'
    },
    {
      icon: ChefHat,
      title: 'Cardápio Digital',
      description: 'Crie e gerencie cardápios com fotos e descrições'
    }
  ];

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      features: [
        'Até 20 produtos',
        'Até 50 pedidos/mês',
        'Comissão de 15%',
        'Suporte por email'
      ],
      highlighted: false
    },
    {
      name: 'Premium',
      price: 'R$ 99',
      period: '/mês',
      features: [
        'Produtos ilimitados',
        'Pedidos ilimitados',
        'Comissão de 8%',
        'Suporte prioritário',
        'Analytics avançado',
        'Promoções personalizadas'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 299',
      period: '/mês',
      features: [
        'Tudo do Premium',
        'Comissão de 5%',
        'Múltiplas lojas',
        'API personalizada',
        'Gerente de conta dedicado',
        'Customização completa'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                FoodSaaS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('login')}>
                Entrar
              </Button>
              <Button className="gradient-primary text-white" onClick={() => onNavigate('register')}>
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Transforme seu Restaurante em um Negócio Digital
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Plataforma completa de delivery que conecta restaurantes e clientes. 
              Comece grátis e escale seu negócio com tecnologia de ponta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-white text-lg px-8" onClick={() => onNavigate('register')}>
                Criar Conta Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => onNavigate('login')}>
                Ver Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <img className="w-full rounded-2xl shadow-2xl" alt="Dashboard do FoodSaaS" src="https://images.unsplash.com/photo-1601972602237-8c79241e468b" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-gray-600">Tudo que você precisa para gerenciar seu delivery</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Planos para Todos os Tamanhos</h2>
            <p className="text-xl text-gray-600">Escolha o plano ideal para seu negócio</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'ring-2 ring-orange-500 shadow-2xl scale-105'
                    : 'shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="gradient-primary text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'gradient-primary text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => onNavigate('register')}
                >
                  Começar Agora
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Pronto para Revolucionar seu Delivery?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de restaurantes que já estão crescendo com o FoodSaaS
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8"
              onClick={() => onNavigate('register')}
            >
              Criar Conta Grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FoodSaaS</span>
              </div>
              <p className="text-gray-400">
                Plataforma completa de delivery para restaurantes
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Recursos</li>
                <li>Preços</li>
                <li>Integrações</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>
                  <a
                    href="https://wa.me/5531984655356"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contato
                  </a>
                </li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FoodSaaS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
  
