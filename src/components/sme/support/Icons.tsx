export const Icons = {
    Feedback: ({ active }: { active: boolean }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Improve: ({ active }: { active: boolean }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Education: ({ active }: { active: boolean }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Financing: ({ active }: { active: boolean }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 17V11M12 8V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Support: ({ active }: { active: boolean }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 21V19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19V21" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Home: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Phone: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 16H14C16.2091 16 18 17.7909 18 20H6C6 17.7909 7.79086 16 10 16Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    Message: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    PlayButton: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="currentColor"/>
        <path d="M9 8L17 12L9 16V8Z" fill="white"/>
      </svg>
    ),
    Expand: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Collapse: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    ArrowRight: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    ArrowLeft: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };