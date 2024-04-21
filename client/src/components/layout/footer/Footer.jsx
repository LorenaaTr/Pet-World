const Footer = () => {
  return (
    <>
      <div className="bg-brown w-full p-12 flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="flex items-center justify-center">
            <div className="p-4">
              <a href="/">
                <img
                  src="../../../images/Logo2.png"
                  alt="logo"
                  className="h-36 rounded-lg"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col  items-center lg:items-start px-24">
            <h4 className="text-white text-lg font-bold">About Us</h4>
            <div className="text-gray font-light items-center lg:items-start flex flex-col text-lg pb-5 lg:pb-0">
              <p>About Us</p>
              <p>Certified B-Corpooration</p>
              <p>Expert Advice</p>
              <p>Sustainability</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start px-24">
            <h4 className="text-white text-lg font-bold">Support</h4>
            <div className="text-gray font-light items-center lg:items-start flex flex-col text-lg pb-5 lg:pb-0">
              <p>Orders</p>
              <p>FAQS</p>
              <p>Contact Us</p>
              <p>Privacy & Policy</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start px-24">
            <h4 className="text-white text-lg font-bold">Location</h4>
            <div className="text-gray font-light  items-center lg:items-start flex flex-col text-lg pb-5 md:pb-0">
              <p>Shop Dogs</p>
              <p>Shop Cats</p>
            </div>
          </div>
        </div>
        <img
          src="../../../images/golden-retriver.png"
          alt="dog"
          className="h-32 hidden lg:flex lg:flex-end "
        />
         
      </div>
    
    </>
  );
};

export default Footer;
