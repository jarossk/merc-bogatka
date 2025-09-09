'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface PartCardProps {
  image: string;
  name: string;
  price: string;
  description: string;
  onAddToCart?: () => void;
}

export const PartCard: React.FC<PartCardProps> = ({ 
  image, 
  name, 
  price, 
  description, 
  onAddToCart 
}) => (
  <Card className="w-full max-w-xs h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
    <CardHeader className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image 
          src={image} 
          alt={name} 
          fill
          className="object-cover rounded border-2 border-gray-200"
        />
      </div>
      <CardTitle className="text-xl font-bold text-primary">{name}</CardTitle>
      <div className="text-yellow-600 font-semibold text-lg">{price}</div>
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-4 flex-grow">
      <CardDescription className="text-center text-sm flex-grow">{description}</CardDescription>
      <Button
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold mt-auto"
        onClick={onAddToCart}
      >
        Dodaj do Koszyka
      </Button>
    </CardContent>
  </Card>
);

export default PartCard;