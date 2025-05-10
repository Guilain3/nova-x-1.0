import Link from 'next/link';
import { Icons } from './Icons';

const BackNavigation = () => {
  return (
    <Link href="#" className="flex items-center text-blue-700 mb-6">
      <Icons.ArrowLeft />
      <span className="ml-2">Back to CapApply</span>
    </Link>
  );
};

export default BackNavigation;