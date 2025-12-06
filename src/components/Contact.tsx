"use client";
const Blob = "/contact/Blob.png";
const UserThumb = "/contact/User Thumb.png";
const ContactPicture = "/contact/Picture.png";
const Vector14 = "/contact/Vector 14.svg";
const Icons = "/contact/Icons.svg";

function Contact() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8">
            <span className="relative inline-block align-baseline">
              <span className="relative z-10">Connect</span>
              <img
                src={Vector14}
                alt=""
                aria-hidden="true"
                className="absolute -bottom-3 md:-bottom-6 left-0 w-40 md:w-52 z-0"
              />
            </span>{" "}
            With <span className="text-black">Us</span>
          </h2>
          <p className="text-gray-500 mb-12 leading-relaxed">
            Stay updated with the latest verified land listings, investment
            opportunities, and expert insights from LandWalaa. Share your email
            address and we will keep you informed about new projects, exclusive
            offers, and helpful guidance for your land investment journey.
          </p>
          <form
            className="w-full max-w-xl relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="contact-email">
              Email
            </label>
            <div className="relative">
              <input
                id="contact-email"
                type="email"
                placeholder="Enter your email"
                className="w-full pr-36 sm:pr-44 pl-5 py-4 rounded-full border border-gray-200 text-base outline-none focus:border-[#EF9E41] transition-colors duration-300 placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                className="mt-3 w-full sm:w-auto sm:mt-0 sm:absolute sm:top-1/2 sm:right-1 sm:-translate-y-1/2 px-6 md:px-7 lg:px-8 py-3 rounded-full bg-blue-900 text-white text-sm md:text-base font-semibold shadow-sm hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-900"
              >
                Connect with us
              </button>
            </div>
          </form>
        </div>
        <div className="relative">
          <div className="relative rounded-3xl p-8 -m-8">
            <img
              src={Blob}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 m-auto w-[320px] md:w-[420px] lg:w-[500px] h-auto object-contain pointer-events-none select-none z-0"
            />
            <img
              src={Icons}
              alt=""
              aria-hidden="true"
              className="absolute bottom-6 right-6 w-20 sm:w-28 md:w-32 lg:w-40 opacity-60 z-0"
            />
            <div className="relative h-96 z-10">
              <div className="absolute top-0 left-0 w-72 h-56 sm:w-96 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src={ContactPicture}
                  alt="Contact Person"
                  className="w-full h-full object-contain"
                />
              </div>
              <img
                src={UserThumb}
                alt="Team Member"
                className="absolute top-60 sm:top-64 lg:top-72 left-48 sm:left-64 lg:left-72 w-24 sm:w-28 h-24 sm:h-28 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
