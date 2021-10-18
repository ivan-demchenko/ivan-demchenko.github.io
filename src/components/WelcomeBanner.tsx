import * as React from "react";

export const WelcomeBanner = () => {
  return (
    <header className="h-5/6 flex items-center justify-center dark:bg-black">
      <figure className="flex flex-col">
        <figcaption className="dark:text-gray-300 text-gray-800 text-center my-12">
          <h1 className="text-6xl font-extralight">Ivan Demchenko</h1>
          <p className="font-serif text-xl italic pt-">
            Software engineering enthusiast
          </p>
        </figcaption>
        <span
          role="image"
          className="portrait h-96 w-96 block bg-contain bg-no-repeat"
        />
      </figure>
    </header>
  );
};
