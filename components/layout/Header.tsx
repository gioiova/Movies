"use client"
import React, { useState } from 'react';
import { Search, Heart, User, LogOut, Menu, X } from 'lucide-react';
import SearchBar from '../search/SearchBar';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-black bg-opacity-90 text-white z-50">
            <nav className="container mx-auto px-4 py-4">
              
                <div className="flex items-center justify-between">
                
                    <div className="flex items-center space-x-8">
                        <Link href={isAuthenticated ? '/home' : '/'} className="text-2xl font-bold text-red-600">
                            MovieList
                        </Link>
                      
                        <div className="hidden md:flex space-x-6">
                            {isAuthenticated && (
                                <>
                                    <Link href="/home" className="hover:text-red-600 transition-colors">Home</Link>
                                    <Link href="/favorites" className="hover:text-red-600 transition-colors">Favorites</Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <SearchBar />
                        {isAuthenticated ? (
                            <>
                                <Link href="/favorites" className="p-2 hover:text-red-600 transition-colors">
                                    <Heart size={20} />
                                </Link>
                                <span className="text-gray-300">Welcome, {user}</span>
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

                    
                    <div className="flex md:hidden items-center space-x-3">
                        {isAuthenticated && (
                            <>
                                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1.5 hover:text-red-600">
                                    <Search size={20} />
                                </button>
                                <Link href="/favorites" className="p-1.5 hover:text-red-600">
                                    <Heart size={20} />
                                </Link>
                                <button onClick={logout} className="p-1.5 hover:text-red-600">
                                    <LogOut size={20} />
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <Link href="/signup" className="p-1.5 hover:text-red-600">
                                <User size={20} />
                            </Link>
                        )}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-1.5 hover:text-red-600 md:hidden"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

               
                {isSearchOpen && (
                    <div className="md:hidden py-2">
                        <SearchBar />
                    </div>
                )}

                {isMenuOpen && (
                    <div className="md:hidden py-2 space-y-2">
                        {isAuthenticated && (
                            <>
                                <Link 
                                    href="/home" 
                                    className="block px-2 py-1 hover:text-red-600 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/favorites" 
                                    className="block px-2 py-1 hover:text-red-600 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Favorites
                                </Link>
                                <div className="px-2 py-1 text-gray-300">
                                    Welcome, {user}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;