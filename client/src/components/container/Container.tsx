import React from "react";

interface IContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: IContainerProps) {
  return <div className="mx-auto px-2 lg:px-4">{children}</div>;
}
