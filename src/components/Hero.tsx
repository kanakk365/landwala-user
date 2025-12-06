const Vector14 = "/contact/Vector 14.svg";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="relative inline-block">
              <span className="relative z-10 text-white">Land</span>
              <img
                src={Vector14}
                alt=""
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full z-0 translate-y-2 opacity-90 scale-110"
              />
            </span>
            <span className="text-[#F7AE49]">Wala</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-white max-w-3xl mx-auto drop-shadow-md">
            Helping you find the property of your{" "}
            <span className="text-[#F7AE49]">dreams.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
