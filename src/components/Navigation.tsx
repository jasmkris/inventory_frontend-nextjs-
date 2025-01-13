'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { routes, managerRoutes } from '@/config/routes';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isManager = session?.user?.role === 'MANAGER';

  const allRoutes = isManager ? [...routes, ...managerRoutes] : routes;

  return (
    <nav className="p-4 bg-background border-b flex justify-between items-center">
      <ul className="flex gap-4">
        {allRoutes.map((route) => (
          <li key={route.path}>
            <Link 
              href={route.path}
              className={`${
                pathname === route.path 
                  ? 'text-foreground font-bold' 
                  : 'text-foreground/60'
              } hover:text-foreground transition-colors`}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <Link href="/login" className="flex items-center justify-center">
                login
        </Link>
        <Link href="/register" className="flex items-center justify-center">
                signup
        </Link>
      </div>
    </nav>
  );
} 