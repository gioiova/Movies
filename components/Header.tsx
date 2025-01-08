"use client"
import React from 'react';
import { Search, Heart, User, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Header = () => {
    const { user,isAuthenticated, logout } = useAuth();
    console.log(isAuthenticated)
    
    return (
      <header className="fixed top-0 w-full bg-black bg-opacity-90 text-white z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href={isAuthenticated ? '/home' : '/'} className="text-2xl font-bold text-red-600">
              MovieList
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex space-x-6">
                <Link href="/home" className="hover:text-red-600 transition-colors">Home</Link>
                <Link href="/favorites" className="hover:text-red-600 transition-colors">Favorites</Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar/>
            {isAuthenticated ? (
              <>
                <Link href="/favorites" className="p-2 hover:text-red-600 transition-colors">
                  <Heart size={20} />
                </Link>
                <span className="text-gray-300">Welcome,{user} </span>
                <button
                  onClick={logout}
                  className="p-2 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link href="/signup" className="p-2 hover:text-red-600 transition-colors">
                <User size={20} />
              </Link>
            )}
          </div>
        </nav>
      </header>
    );
};

export default Header;