import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // 🎯 Cursor position state
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auth check
  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) dispatch(login(user));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col ">
      {/* 🌟 FOLLOWING DIV */}
      <div
        className="pointer-events-none -z-10 fixed w-3 h-3 rounded-full bg-white/30 shadow-sm border border-gray-100  transition-transform duration-150"
        style={{
          transform: `translate(${pos.x - 3}px, ${pos.y - 10}px)`
        }}
      />

      <Header />
      <main className="w-full block">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
