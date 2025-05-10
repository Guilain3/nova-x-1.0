"use client"

import React, { useState, useEffect } from "react";
import Layout from "../../dashboard/layout";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SME, fetchSmeById } from "../../mockdata/SmeInfo";
import { IoChevronBack } from "react-icons/io5";
import { FaRegFilePdf, FaRegFileExcel, FaRegFileWord, FaRegFile } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import AddReviewComponent from "../../../../components/investor/AddReviewComponent";
import ContactModal from "./contactModalProps"; // Import the new ContactModal component

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




const SmeDetail: React.FC = () => {
  // Use useSearchParams instead of router.query for App Router
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [sme, setSme] = useState<SME | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false); // Add state for contact modal
  // const handleReviewAdded = (newReview) => {
  //   // setSme({...sme, reviews: [...sme.reviews, newReview]});
  //   // setCurrentReviewIndex(sme.reviews.length);
  //   // setShowAddReview(false);
  // };

  useEffect(() => {
    const loadSmeDetails = async () => {
      if (!id) return; // Wait until we have an ID

      try {
        setLoading(true);
        const smeData = await fetchSmeById(id);
        
        if (!smeData) {
          setError("SME not found");
          return;
        }
        
        setSme(smeData);
        setError(null);
      } catch (err) {
        console.error("Error fetching SME details:", err);
        setError("Failed to load SME details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSmeDetails();
  }, [id]);

  // Function to get appropriate icon for document type
  const getDocumentIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return <FaRegFilePdf className="text-red-500 text-xl" />;
      case 'xlsx':
      case 'xls':
        return <FaRegFileExcel className="text-green-600 text-xl" />;
      case 'doc':
      case 'docx':
        return <FaRegFileWord className="text-blue-600 text-xl" />;
      default:
        return <FaRegFile className="text-gray-500 text-xl" />;
    }
  };

  // Generate data for revenue vs expenses chart
  const getRevenueExpensesData = () => {
    if (!sme?.financials) return null;
    
    const labels = Object.keys(sme.financials.monthlyRevenue);
    const revenueData = Object.values(sme.financials.monthlyRevenue);
    const expensesData = Object.values(sme.financials.monthlyExpenses);
    
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          backgroundColor: 'rgba(52, 152, 139, 0.7)',
          borderColor: 'rgba(52, 152, 139, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: expensesData,
          backgroundColor: 'rgba(231, 76, 60, 0.7)',
          borderColor: 'rgba(231, 76, 60, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Generate data for monthly cash flow chart
  const getCashFlowData = () => {
    if (!sme?.financials) return null;
    
    const labels = Object.keys(sme.financials.monthlyCashFlow);
    const cashFlowData = Object.values(sme.financials.monthlyCashFlow);
    
    return {
      labels,
      datasets: [
        {
          label: 'Cash Flow',
          data: cashFlowData,
          fill: false,
          borderColor: 'rgba(45, 52, 160, 1)',
          tension: 0.1,
          pointBackgroundColor: 'rgba(45, 52, 160, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(45, 52, 160, 1)',
        },
      ],
    };
  };

  // Navigate to previous/next review
  const showNextReview = () => {
    if (sme?.reviews && currentReviewIndex < sme.reviews.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
    }
  };

  const showPrevReview = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1);
    }
  };

  // Function to handle opening the contact modal
  const handleContactClick = () => {
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Loading SME details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !sme) {
    return (
      <Layout>
        <div className="p-4">
          <Link href="/investor/find-smes">
            <button className="flex items-center text-blue-600 mb-4">
              <IoChevronBack className="mr-1" /> Back to SMEs
            </button>
          </Link>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "SME not found"}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {/* Back button */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/investor/find-smes">
            <button className="flex items-center text-blue-600">
              <IoChevronBack className="mr-1" /> Back to SMEs
            </button>
          </Link>
          <div className="text-sm breadcrumbs">
            <ul className="flex">
              <li><Link href="/investor" className="text-gray-500">Investor</Link></li>
              <li><Link href="/investor/find-smes" className="text-gray-500">FindSMEs</Link></li>
            </ul>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">{sme.title}</h1>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Video/Image section */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
              <div className="relative aspect-video">
                {sme.videoUrl ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={sme.videoUrl} 
                    title={`${sme.title} video`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={sme.imageUrl}
                      alt={`${sme.title} image`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                
                {/* Play button overlay if it's an image but should look like a video */}
                {!sme.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-4 bg-opacity-80">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Company info section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap gap-8 mb-4">
                <div>
                  <div className="text-gray-500 text-sm">Category</div>
                  <div className="font-semibold">{sme.category}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Location</div>
                  <div className="font-semibold">{sme.location}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Founded</div>
                  <div className="font-semibold">{sme.foundedYear}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Employees</div>
                  <div className="font-semibold">{sme.employeeCount}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Business Description</h3>
                <p className="text-gray-700">{sme.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">CEO / Founder</h3>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-500 text-xl mr-3">
                    {sme.ceo.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{sme.ceo.name}</div>
                    <div className="text-gray-500 text-sm">{sme.ceo.title}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Credit Score: {sme.creditScore.grade}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(sme.creditScore.score / 1000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center mt-1 font-bold text-xl text-blue-600">{sme.creditScore.score} Points</div>
                <div className="grid grid-cols-4 mt-4">
                  <div className="text-center">
                    <div className="h-2 bg-gray-300 w-3/4 mx-auto"></div>
                    <p className="text-xs text-gray-500 mt-1">250-449</p>
                  </div>
                  <div className="text-center">
                    <div className="h-2 bg-blue-300 w-3/4 mx-auto"></div>
                    <p className="text-xs text-gray-500 mt-1">450-649</p>
                  </div>
                  <div className="text-center">
                    <div className="h-2 bg-blue-500 w-3/4 mx-auto"></div>
                    <p className="text-xs text-gray-500 mt-1">650-799</p>
                  </div>
                  <div className="text-center">
                    <div className="h-2 bg-blue-700 w-3/4 mx-auto"></div>
                    <p className="text-xs text-gray-500 mt-1">800-1000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial charts section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Revenue Vs Expenses
              </h3>
              
              <div className="h-64 mb-8">
                {getRevenueExpensesData() && (
                  <Bar
                    data={getRevenueExpensesData()!}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                )}
              </div>
              
              <h3 className="font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Monthly Cash Flow
              </h3>
              
              <div className="h-64">
                {getCashFlowData() && (
                  <Line
                    data={getCashFlowData()!}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>

            {/* Documents section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4">Documents</h3>
              
              <div className="space-y-3">
                {sme.documents && sme.documents.map(doc => (
                  <div key={doc.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    {getDocumentIcon(doc.fileUrl)}
                    <div className="ml-3 flex-grow">
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-gray-500 text-sm">Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4">Investor's Review</h3>
              
              {sme.reviews && sme.reviews.length > 0 && (
                <div className="text-center py-6">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center">
                      {sme.reviews[currentReviewIndex].reviewerImageUrl ? (
                        <Image
                          src={sme.reviews[currentReviewIndex].reviewerImageUrl}
                          alt={sme.reviews[currentReviewIndex].reviewerName}
                          width={96}
                          height={96}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-2xl">{sme.reviews[currentReviewIndex].reviewerName.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold">{sme.reviews[currentReviewIndex].reviewerName}</h4>
                  <p className="text-gray-500 text-sm mb-4">{sme.reviews[currentReviewIndex].reviewerLocation}</p>
                  
                  <div className="text-lg italic mb-6">
                    <span className="text-4xl text-gray-300">"</span>
                    {sme.reviews[currentReviewIndex].content}
                    <span className="text-4xl text-gray-300">"</span>
                  </div>
                  
                  <div className="flex justify-center items-center space-x-4">
                    <button 
                      onClick={showPrevReview} 
                      disabled={currentReviewIndex === 0}
                      className={`p-2 rounded-full ${currentReviewIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <span className="text-sm text-gray-500">
                      {currentReviewIndex + 1} / {sme.reviews.length}
                    </span>
                    
                    <button 
                      onClick={showNextReview}
                      disabled={currentReviewIndex === sme.reviews.length - 1}
                      className={`p-2 rounded-full ${currentReviewIndex === sme.reviews.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-6 text-center">
              <button onClick={() => setShowAddReview(true)} className="px-6 py-2 bg-blue-600 text-white rounded">
                Add your review
              </button>
              </div>
            </div>
          </div>
          {/* {showAddReview && (
        <AddReviewComponent
          smeId={sme.id}
          onReviewAdded={handleReviewAdded}
          onCancel={() => setShowAddReview(false)}
        />
      )} */}

          {/* Right sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* Investment overview card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4">Investment Overview</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-semibold">RWF {sme.requiredAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-semibold">RWF {sme.minimumInvestment.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Equity Offer</span>
                  <span className="font-semibold">{sme.equityOffer}%</span>
                </div>
                
                {/* Update the Contact button to open the modal */}
                <button 
                  onClick={handleContactClick} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4"
                >
                  Contact
                </button>
                
                <Link href={`/investor/find-smes/sme-detail/mark-sme-invested?id=${sme.id}`}>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded">
                    Mark Invested
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Credit score visualization */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4">Current Credit Score</h3>
              
              <div className="relative w-48 h-48 mx-auto">
                {/* This is a simplified circular progress visualization */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="10"
                  />
                  
                  {/* Progress arc - calculates the correct arc based on score */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="10"
                    strokeDasharray={`${(sme.creditScore.score / 1000) * 283} 283`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* Blue segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#2196F3"
                    strokeWidth="10"
                    strokeDasharray="70 283"
                    strokeDashoffset="-70"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-green-500">{sme.creditScore.score}</span>
                  <span className="text-sm text-gray-500">Points</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="h-2 bg-gray-200 rounded-full mb-1">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Credit History</p>
                </div>
                
                <div>
                  <div className="h-2 bg-gray-200 rounded-full mb-1">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Payment History</p>
                </div>
                
                <div>
                  <div className="h-2 bg-gray-200 rounded-full mb-1">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Credit Usage</p>
                </div>
                
                <div>
                  <div className="h-2 bg-gray-200 rounded-full mb-1">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">New Credit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render the Contact Modal */}
      {sme && showContactModal && (
        <ContactModal 
          sme={sme} 
          isOpen={showContactModal} 
          onClose={() => setShowContactModal(false)} 
        />
      )}
    </Layout>
  );
};

export default SmeDetail;