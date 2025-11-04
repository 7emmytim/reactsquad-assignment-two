import React from "react";

export function withLayout<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  const Layout: React.FC<T> = (props) => {
    return (
      <div className="bg-gray-50 text-black py-10 min-h-screen">
        <div className="container mx-auto">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };

  return Layout;
}
