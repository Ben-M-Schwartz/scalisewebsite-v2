import React from "react";
import Image from "next/image";

export interface HomePageProps {
  className?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ className = "" }) => (
  <>
    <main className={className}>
      <div className="flex min-h-screen flex-col bg-gray-800">
        <div className="h-screen">
          <div className="absolute">
            <Image
              src="/Red_Felt.png"
              alt="Red Felt"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h1 className="text-center text-8xl text-white">
              Album Release Party
            </h1>
          </div>
        </div>
      </div>
    </main>
  </>
);
