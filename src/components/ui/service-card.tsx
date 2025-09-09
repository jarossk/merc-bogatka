'use client';

import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface ServiceCardProps {
  title: string;
  description: string;
  onBook?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, onBook }) => (
  <Card className="w-full max-w-xs h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-4 flex-grow">
      <CardDescription className="text-center flex-grow">{description}</CardDescription>
      <Button
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold mt-auto"
        onClick={onBook}
      >
        Umów Serwis
      </Button>
    </CardContent>
  </Card>
);

export default ServiceCard;