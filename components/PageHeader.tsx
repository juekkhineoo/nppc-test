'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface PageHeaderProps {
  title: string;
  description: string;
  buttons: {
    href: string;
    label: string;
    variant?: 'solid' | 'bordered' | 'light';
    color?: 'primary' | 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  }[];
}

export default function PageHeader({ title, description, buttons }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      </div>
      <div className="flex gap-4 items-center">
        {buttons.map((button, index) => (
          <Button
            key={index}
            as={Link}
            href={button.href}
            color={button.color || 'default'}
            variant={button.variant || 'bordered'}
            className={button.color === 'primary' ? 'font-medium' : ''}
          >
            {button.label}
          </Button>
        ))}
        <ThemeToggle />
      </div>
    </div>
  );
}
