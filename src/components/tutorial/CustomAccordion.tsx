import React from 'react';

interface Props { children: React.ReactNode }
interface ItemProps { children: React.ReactNode; value: string; isOpen: boolean; onToggle: () => void }
interface TriggerProps { children: React.ReactNode; isOpen?: boolean; onToggle?: () => void }
interface ContentProps { children: React.ReactNode; isOpen?: boolean }

export const CustomAccordion: React.FC<Props> = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

export const CustomAccordionItem: React.FC<ItemProps> = ({ children, isOpen, onToggle }) => (
  <div className="border-none">
    {React.Children.map(children, child =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle })
        : child
    )}
  </div>
);

export const CustomAccordionTrigger: React.FC<TriggerProps> = ({ children, onToggle }) => (
  <button onClick={onToggle} className="w-full focus:outline-none">{children}</button>
);

export const CustomAccordionContent: React.FC<ContentProps> = ({ children, isOpen }) => (
  <div className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
    <div className="pt-4">{children}</div>
  </div>
);
