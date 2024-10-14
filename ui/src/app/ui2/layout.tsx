"use client";

import Image from "next/image";

export default function LayoutUi2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen text-white flex flex-col relative items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/images/bg.jpeg"
          alt={`Background`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full h-full relative z-10 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
