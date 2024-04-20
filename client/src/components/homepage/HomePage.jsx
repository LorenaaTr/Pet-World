import React from "react";
import Header from "../layout/header/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <header style={headerStyle}>
        <h1>Welcome to Our Website</h1>
        <p>We make your life easier with our amazing products.</p>
      </header>
      <section style={mainContentStyle}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          convallis lectus et mi eleifend, nec faucibus arcu pulvinar.
        </p>
        <h2>Our Services</h2>
        <p>
          Sed non est eget velit tincidunt lacinia ac nec metus. Morbi
          consequat mattis lorem, ac ultrices est cursus nec.
        </p>
      </section>
      <footer style={footerStyle}>
        <p>&copy; 2024 Our Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// Styles
const headerStyle = {
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#f0f0f0",
};

const mainContentStyle = {
  padding: "1rem",
};

const footerStyle = {
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "#333",
  color: "#fff",
};

export default HomePage;
