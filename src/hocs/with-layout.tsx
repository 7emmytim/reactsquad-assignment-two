import Link from "next/link";
import React from "react";

export function withLayout<T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  const Layout: React.FC<T> = (props) => {
    return (
      <div className="bg-gray-50 text-black py-10 min-h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center gap-3 text-blue-500">
            <Link href="/">Home</Link>
            <Link href="/search">Search</Link>
            <Link href="/experiments/pricing">Experiments</Link>
          </div>
          <div className="mt-10">
            <WrappedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };

  return Layout;
}
