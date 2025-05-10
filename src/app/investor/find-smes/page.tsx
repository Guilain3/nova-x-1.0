"use client";

import { SME, fetchSmeData } from "../mockdata/SmeInfo";
import React, { useState, useEffect, useMemo } from "react";
import SmeCard from "../../../components/investor/SmeCard";
import Layout from "../dashboard/layout";

const FindSmesPage: React.FC = () => {
  const [smes, setSmes] = useState<SME[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [amountFilter, setAmountFilter] = useState<{min: number, max: number | null}>({
    min: 0,
    max: null
  });

  useEffect(() => {
    const loadSmes = async () => {
      try {
        setLoading(true);
        // This uses our mock function for now, but can be replaced with real API call later
        const data = await fetchSmeData();
        setSmes(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching SMEs:", err);
        setError("Failed to load SMEs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSmes();
  }, []);

  // Extract unique categories and locations for filter dropdowns
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(smes.map(sme => sme.category))];
    return uniqueCategories.sort();
  }, [smes]);

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(smes.map(sme => sme.location))];
    return uniqueLocations.sort();
  }, [smes]);

  // Filter SMEs based on all criteria
  const filteredSmes = useMemo(() => {
    return smes.filter(sme => {
      // Search term filter (searches in title and description)
      const matchesSearch = searchTerm === "" || 
        sme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sme.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "" || 
        sme.category === selectedCategory;
      
      // Location filter
      const matchesLocation = selectedLocation === "" || 
        sme.location === selectedLocation;
      
      // Amount filter
      const matchesAmount = 
        sme.requiredAmount >= amountFilter.min &&
        (amountFilter.max === null || sme.requiredAmount <= amountFilter.max);
      
      return matchesSearch && matchesCategory && matchesLocation && matchesAmount;
    });
  }, [smes, searchTerm, selectedCategory, selectedLocation, amountFilter]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setAmountFilter({ min: 0, max: null });
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Find SMEs</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading SMEs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <>
            {/* Search and Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or description"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Category Filter */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                {/* Amount Filter */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Amount
                  </label>
                  <select
                    id="amount"
                    value={
                      amountFilter.max === null 
                        ? "any" 
                        : amountFilter.max === 50000 
                          ? "under50k"
                          : amountFilter.max === 100000 
                            ? "under100k" 
                            : amountFilter.min === 100000 
                              ? "over100k" 
                              : "custom"
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "under50k") {
                        setAmountFilter({ min: 0, max: 50000 });
                      } else if (value === "under100k") {
                        setAmountFilter({ min: 0, max: 100000 });
                      } else if (value === "over100k") {
                        setAmountFilter({ min: 100000, max: null });
                      } else {
                        setAmountFilter({ min: 0, max: null });
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="any">Any Amount</option>
                    <option value="under50k">Under $50,000</option>
                    <option value="under100k">Under $100,000</option>
                    <option value="over100k">Over $100,000</option>
                  </select>
                </div>
              </div>
              
              {/* Filter controls & results count */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Reset Filters
                </button>
                <p className="text-gray-600 text-sm">
                  Showing {filteredSmes.length} of {smes.length} SMEs
                </p>
              </div>
            </div>
            
            {/* SME Cards */}
            {filteredSmes.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <p className="text-gray-500">No SMEs match your filters. Try adjusting your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSmes.map((sme) => (
                  <SmeCard key={sme.id} {...sme} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default FindSmesPage;