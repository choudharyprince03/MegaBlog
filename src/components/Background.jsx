const Background = () => (
  <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: -1,
    top: 0,
    left: 0
  }}>
    <svg width="100%" height="100%" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A7C7D8" />
          <stop offset="80%" stopColor="#EDE6C7" />
          <stop offset="100%" stopColor="#8A728E" />
        </linearGradient>
        <linearGradient id="shapeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B5A1B9" />
          <stop offset="100%" stopColor="#8A728E" />
        </linearGradient>
        <linearGradient id="shapeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9F8CA2" />
          <stop offset="100%" stopColor="#745E77" />
        </linearGradient>
        <linearGradient id="bubbleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0D9C2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C8C8B6" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="bubbleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A7C7D8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8FB5CB" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#bgGradient)" />

      <path d="M1600,0 L1600,900 L800,900 C600,900 400,800 400,600 C400,400 800,200 1200,200 L1600,0 Z" fill="url(#shapeGradient2)" />
      <path d="M1600,0 L1600,900 L1200,900 C1000,900 800,800 800,600 C800,400 1200,200 1400,100 L1600,0 Z" fill="url(#shapeGradient1)" />

      <path d="M600,200 C710.457,200 800,289.543 800,400 C800,444.183 785.577,485.095 761.006,518.171 L800,600 L718.171,561.006 C685.095,585.577 644.183,600 600,600 C489.543,600 400,510.457 400,400 C400,289.543 489.543,200 600,200 Z" fill="url(#bubbleGradient1)" />
      <path d="M500,100 C610.457,100 700,189.543 700,300 C700,344.183 685.577,385.095 661.006,418.171 L700,500 L618.171,461.006 C585.095,485.577 544.183,500 500,500 C389.543,500 300,410.457 300,300 C300,189.543 389.543,100 500,100 Z" fill="url(#bubbleGradient2)" />

      <text x="1300" y="850" fontFamily="Arial, sans-serif" fontSize="60" fill="#745E77">Blogged</text>
  
    </svg>
  </div>
);

export default Background;