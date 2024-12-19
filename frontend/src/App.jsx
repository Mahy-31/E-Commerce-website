import React from 'react';
import { Navigate,Route, Routes } from "react-router-dom";
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import Admin from './pages/Admin.jsx';
import Category from './pages/Category.jsx';
import CartPage from './pages/Cart.jsx';
import PurchaseSuccessPage from './pages/PurchaseSuccess.jsx';
import PurchaseCancelPage from './pages/PurchaseCancel.jsx';

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
	checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
	<div className='min-h-screen bg-black text-white relative overflow-hidden'>
		<div className='relative z-50 pt-20'>
		<Navbar/>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
			<Route path="/login" element={ !user ? <Login/> : <Navigate to='/' />} />
			<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <Admin /> : <Navigate to='/login' />}
					/>
			<Route path='/category/:category' element={<Category />} />
			<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
			<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
		</Routes>
		</div>
		<Toaster />
	</div>
  )
}

export default App