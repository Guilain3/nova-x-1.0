const CallToAction = () => {
  return (
    <div className="bg-blue-700 rounded-lg text-white p-4 flex items-center mb-8">
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="blue" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 16.5L7 9L12 12L16.5 7L20.5 13.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold">Call to Action</h2>
        <p className="text-sm">offering a clear, supportive, and actionable path after a loan or fund rejection.</p>
      </div>
    </div>
  );
};

export default CallToAction;