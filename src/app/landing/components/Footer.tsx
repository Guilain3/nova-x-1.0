import React from "react";
import { Facebook, Instagram, Send, Twitter, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#263238] text-gray-300 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Copyright section */}
                    <div className="space-y-2 max-w-[280px]">
                        <img src="/landing/nova-white.svg" alt="Nova X Logo" className="h-20 w-auto" />
                        <p className="text-sm">Copyright © 2024 NOVA X ltd.</p>
                        <p className="text-sm">All rights reserved</p>
                    </div>

                    {/* Company links */}
                    <div className="max-w-[200px]">
                        <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition-colors text-sm">About us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Contact us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Support links */}
                    <div className="max-w-[200px]">
                        <h2 className="text-lg font-semibold text-white mb-4">Support</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Help center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Terms of service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Legal</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Privacy policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-sm">Status</a></li>
                        </ul>
                    </div>

                    {/* Stay up to date section with send icon */}
                    <div className="lg:col-span-1 md:col-span-2 w-full max-w-[320px]">
                        <h2 className="text-lg font-semibold text-white mb-4">Stay up to date</h2>
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-2 pr-10 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                                aria-label="Subscribe"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social media links */}
                <div className="mt-8 flex space-x-4">
                    <a href="https://instagram.com">
                        <Instagram className="hover:text-white transition-colors" />
                    </a>
                    <a href="https://facebook.com">
                        <Facebook className="hover:text-white transition-colors" />
                    </a>
                    <a href="https://twitter.com">
                        <Twitter className="hover:text-white transition-colors" />
                    </a>
                    <a href="https://youtube.com">
                        <Youtube className="hover:text-white transition-colors" />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;