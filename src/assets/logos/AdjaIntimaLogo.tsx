interface AdjaIntimaLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function AdjaIntimaLogo({ className = "", width = 200, height = 200 }: AdjaIntimaLogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fond dégradé orange/jaune */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FCD34D', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FB923C', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="hairGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1E293B', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#334155', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Cercle de fond */}
      <circle cx="100" cy="100" r="95" fill="url(#bgGradient)" opacity="0.3"/>
      
      {/* Silhouette simplifiée d'une femme avec cheveux ondulés */}
      <g transform="translate(100, 100)">
        {/* Cheveux ondulés */}
        <path
          d="M -10,-40 Q -15,-45 -18,-50 Q -20,-60 -15,-65 Q -10,-68 -5,-65 Q 0,-70 5,-72 Q 10,-75 15,-72 Q 18,-68 20,-60 Q 22,-50 18,-45 Q 15,-42 12,-40 L 12,0 Q 8,5 0,5 Q -8,5 -10,0 Z"
          fill="url(#hairGradient)"
        />
        
        {/* Visage/cou */}
        <ellipse cx="0" cy="-15" rx="8" ry="12" fill="#D4A574"/>
        <rect x="-3" y="-5" width="6" height="8" fill="#D4A574"/>
        
        {/* Corps en serviette */}
        <path
          d="M -12,3 L -15,20 L -10,35 L 10,35 L 15,20 L 12,3 Z"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        
        {/* Bras avec branche */}
        <path
          d="M 12,5 Q 18,8 22,12"
          stroke="#D4A574"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Branche d'olivier */}
        <g transform="translate(22, 12)">
          <path
            d="M 0,0 Q 3,-2 6,-1 Q 8,0 8,3"
            stroke="#10B981"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse cx="2" cy="-1" rx="1.5" ry="2.5" fill="#10B981" opacity="0.7"/>
          <ellipse cx="5" cy="1" rx="1.5" ry="2.5" fill="#10B981" opacity="0.7"/>
          <ellipse cx="7" cy="3" rx="1.5" ry="2.5" fill="#10B981" opacity="0.7"/>
          {/* Petites fleurs */}
          <circle cx="3" cy="0" r="1" fill="#FCD34D"/>
          <circle cx="6" cy="2" r="1" fill="#FCD34D"/>
        </g>
      </g>

      {/* Texte ADJA */}
      <text
        x="20"
        y="120"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="0.5"
      >
        ADJA
      </text>

      {/* Texte Intima */}
      <text
        x="90"
        y="145"
        fontFamily="Georgia, serif"
        fontSize="28"
        fontStyle="italic"
        fill="#1E293B"
      >
        Intima
      </text>
    </svg>
  );
}
