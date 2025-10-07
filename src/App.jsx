
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ClientDashboard from '@/pages/ClientDashboard';
import RestaurantDashboard from '@/pages/RestaurantDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import RestaurantView from '@/pages/RestaurantView';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderTracking from '@/pages/OrderTracking';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('foodsaas_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      const user = JSON.parse(savedUser);
      if (user.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else if (user.role === 'restaurant') {
        setCurrentPage('restaurant-dashboard');
      } else {
        setCurrentPage('client-dashboard');
      }
    }

    const savedCart = localStorage.getItem('foodsaas_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('foodsaas_user', JSON.stringify(user));
    
    if (user.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else if (user.role === 'restaurant') {
      setCurrentPage('restaurant-dashboard');
    } else {
      setCurrentPage('client-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('foodsaas_user');
    setCurrentPage('landing');
    setCart([]);
    localStorage.removeItem('foodsaas_cart');
  };

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      if (page === 'restaurant-view') {
        setSelectedRestaurant(data);
      } else if (page === 'order-tracking') {
        setCurrentOrder(data);
      }
    }
  };

  const handleAddToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem('foodsaas_cart', JSON.stringify(newCart));
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('foodsaas_cart', JSON.stringify(newCart));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('foodsaas_cart');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'client-dashboard':
        return (
          <ClientDashboard
            user={currentUser}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        );
      case 'restaurant-dashboard':
        return (
          <RestaurantDashboard
            user={currentUser}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            user={currentUser}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'restaurant-view':
        return (
          <RestaurantView
            restaurant={selectedRestaurant}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            cart={cart}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cart={cart}
            restaurant={selectedRestaurant}
            user={currentUser}
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
          />
        );
      case 'order-tracking':
        return (
          <OrderTracking
            order={currentOrder}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>FoodSaaS - Plataforma de Delivery Multi-Restaurantes</title>
        <meta name="description" content="Sistema SaaS completo para delivery de comida online. Conecte restaurantes e clientes com tecnologia de ponta." />
      </Helmet>
      {renderPage()}
      <Toaster />
    </>
  );
}

export default App;
  