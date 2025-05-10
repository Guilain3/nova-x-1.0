import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SME } from '../.././app/investor/mockdata/SmeInfo'; 

// Using the same interface from the mock data file
interface SmeCardProps extends SME {
  // You can add additional props specific to the component if needed
}

const SmeCard: React.FC<SmeCardProps> = ({
  id,
  imageUrl,
  title,
  location,
  category,
  description,
  requiredAmount,
  detailsUrl,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Image section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={`${title} image`}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      {/* Content section */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-xl mb-1">{title}</h2>
        <div className="text-gray-500 text-sm mb-2">
          {category} • {location}
        </div>
        
        <p className="text-gray-700 text-sm mb-4">
          {description.length > 120 ? `${description.substring(0, 120)}...` : description}
        </p>
        
        
        <div className="mb-4">
          <p className="font-semibold text-sm">Required: RWF {requiredAmount.toLocaleString()}</p>
        </div>
        
        
        <Link href={`/investor/find-smes/sme-detail?id=${id}`}>
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SmeCard;