import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex px-1 py-2 text-zinc-500 text-[11px] font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Home className="mr-1.5 h-3 w-3" />
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="h-3 w-3 text-zinc-600 flex-shrink-0" />
                {isLast || !item.to ? (
                  <span className="ml-1.5 md:ml-2 text-zinc-300 font-semibold select-none">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.to}
                    className="ml-1.5 md:ml-2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
