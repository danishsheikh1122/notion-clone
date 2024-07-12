import Image from "next/image";
import React from "react";

const hero = () => {

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl gap-2">
      <div className="flex text-center gap-1">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm-h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/documents.png"
            alt="document"
            fill
            className="object-contain dark:hidden"
          ></Image>
          <Image
            src="/documents-dark.png"
            alt="document"
            fill
            className="object-contain hidden dark:block"
          ></Image>
        </div>
        <div className="relative w-[400px] h-[400px] sm:hidden lg:block">
          <Image
            src="/reading.png"
            alt="reading"
            layout="fill"
            objectFit="contain"
            className="dark:hidden"
          />
          <Image
            src="/reading-dark.png"
            alt="reading"
            layout="fill"
            objectFit="contain"
            className="dark:block hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default hero;
