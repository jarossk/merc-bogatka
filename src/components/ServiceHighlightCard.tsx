import React from 'react';
import { Card, CardContent } from '@/components/ui';

interface ServiceHighlightCardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

const ServiceHighlightCard: React.FC<ServiceHighlightCardProps> = ({ 
  image, 
  title, 
  description, 
  buttonText, 
  onClick 
}) => (
  <Card className="overflow-hidden flex flex-col items-center p-6 w-full max-w-xs transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <img 
      src={image} 
      alt={title} 
      className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-border shadow-md" 
    />
    <h3 className="text-xl font-bold mb-2 text-primary font-sans text-center">
      {title}
    </h3>
    <CardContent className="p-0 flex-1 flex flex-col">
      <p className="text-muted-foreground mb-4 text-center text-sm flex-1">
        {description}
      </p>
      <button
        className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded hover:bg-primary/90 transition-colors w-full mt-auto"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </CardContent>
  </Card>
);

export default ServiceHighlightCard;