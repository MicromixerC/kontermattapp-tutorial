
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomAccordionProps {
  children: React.ReactNode;
}

interface CustomAccordionItemProps {
  children: React.ReactNode;
  value: string;
  isOpen: boolean;
  onToggle: () => void;
}

interface CustomAccordionTriggerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface CustomAccordionContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export const CustomAccordion: React.FC<CustomAccordionProps> = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

export const CustomAccordionItem: React.FC<CustomAccordionItemProps> = ({
  children,
  value,
  isOpen,
  onToggle
}) => (
  <div className="border-none">
    {React.Children.map(children, child => 
      React.isValidElement(child) 
        ? React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle })
        : child
    )}
  </div>
);

export const CustomAccordionTrigger: React.FC<CustomAccordionTriggerProps> = ({
  children,
  isOpen,
  onToggle
}) => (
  <button onClick={onToggle} className="w-full hover:no-underline focus:outline-none">
    {children}
  </button>
);

export const CustomAccordionContent: React.FC<CustomAccordionContentProps> = ({
  children,
  isOpen
}) => (
  <div className={`transition-all duration-200 overflow-hidden ${
    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
  }`}>
    <div className="pt-4">
      {children}
    </div>
  </div>
);
