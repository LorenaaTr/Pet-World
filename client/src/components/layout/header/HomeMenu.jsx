import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/HomeMenu.css";

const HomeMenu = () => {
  return (
    <Flex
      height={{ base: "3.2rem", md: "4.94rem" }}
      minW={"100%"}
      justify={"space-around"}
      pos="relative"
      align="center"
      display={{ base: "none", lg: "Flex" }}
      width="36%"
      gap={5}

      // border="1px solid red"
    >
         <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="18%"
      >
        <Link to="/home">Home</Link>
      </Flex>

      <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="15%"
      >
        <Link to="/dogspage">Dogs</Link>
        <Box
          top="4rem"
          className="drop-down-content"
          left="-2rem"
          overflow="hidden"
          bg="white"
          pos={"absolute"}
          width="1000px"
          transition={"all 0.3s"}
          height={"0vh"}
          marginTop="14px"
        >
          <Link to="#">
            <div className="main-menu">
              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Western Wear</p>

                  <li>
                    <Link to="#">Top/Tees</Link>
                  </li>
                  <li>
                    <Link to="#">Dresses</Link>
                  </li>
                  <li>
                    <Link to="#">Jumpsuits</Link>
                  </li>
                  <li>
                    <Link to="#">Jeggings</Link>
                  </li>
                  <li>
                    <Link to="#">Jeans</Link>
                  </li>
                  <li>
                    <Link to="#">Shorts/Skirts</Link>
                  </li>
                  <li>
                    <Link to="#">Trousers</Link>
                  </li>
                  <li>
                    <Link to="#">Plus Size</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Sleepwear</p>
                  <li>
                    <Link to="#">Bras</Link>
                  </li>
                  <li>
                    <Link to="#">Briefs/Panties</Link>
                  </li>
                  <li>
                    <Link to="#">Cami/Slips</Link>
                  </li>
                  <li>
                    <Link to="#">Shapewear</Link>
                  </li>
                  <li>
                    <Link to="#">Nightwear</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Sports Wear</p>

                  <li>
                    <Link>Tops / Tees</Link>
                  </li>
                  <li>
                    <Link>Sports Bra</Link>
                  </li>
                  <li>
                    <Link>Leggings</Link>
                  </li>
                  <li>
                    <Link>Joggers / Tracks</Link>
                  </li>
                  <li>
                    <Link>Sweatshirts</Link>
                  </li>
                  <li>
                    <Link>Jackets</Link>
                  </li>
                </ul>
              </div>
              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Top Brands</p>

                  <li>
                    <Link>Melange</Link>
                  </li>
                  <li>
                    <Link>Ginger</Link>
                  </li>
                  <li>
                    <Link>Code</Link>
                  </li>
                  <li>
                    <Link>Fame Forever</Link>
                  </li>
                  <li>
                    <Link>Kappa</Link>
                  </li>
                  <li>
                    <Link>Biba</Link>
                  </li>
                  <li>
                    <Link>Aurelia</Link>
                  </li>
                  <li>
                    <Link>AND</Link>
                  </li>
                  <li>
                    <Link>Allen Solly</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading"> Summer Essentials</p>
                  <p className="category-heading"> Beauty</p>
                  <p className="category-heading"> Footwear/Bags</p>
                  <p className="category-heading"> Watches </p>
                  <p className="category-heading"> Jewellery</p>
                  <p className="category-heading"> Fragrances</p>
                </ul>
              </div>
            </div>
          </Link>
        </Box>
      </Flex>
      <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="15%"
      >
        <Link to="/catspage">Cats</Link>
        <Box
          top="4rem"
          className="drop-down-content"
          left="-2rem"
          overflow="hidden"
          bg="white"
          pos={"absolute"}
          width="1000px"
          transition={"all 0.3s"}
          height={"0vh"}
          marginTop="14px"
        >
          <Link to="#">
            <div className="main-menu">
              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Topwear</p>
                  <li>
                    <Link to="#">Casual Shirts</Link>
                  </li>
                  <li>
                    <Link to="#">Formal Shirts</Link>
                  </li>
                  <li>
                    <Link to="#">Polos</Link>
                  </li>
                  <li>
                    <Link to="#">T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="#">Jackets</Link>
                  </li>
                  <li>
                    <Link to="#">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="#">Sweatshirts</Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">Bottomwear</p>
                  <li>
                    <Link to="#">Casual Trousers</Link>
                  </li>
                  <li>
                    <Link to="#">Formal Trousers</Link>
                  </li>
                  <li>
                    <Link to="#">Jeans</Link>
                  </li>
                  <li>
                    <Link to="#">Track Pants</Link>
                  </li>
                  <li>
                    <Link to="#">Shorts</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Activewear</p>

                  <li>
                    <Link to="#">Polos</Link>
                  </li>
                  <li>
                    <Link to="#">Sport T-shirts</Link>
                  </li>
                  <li>
                    <Link to="#">Track Pants</Link>
                  </li>
                  <li>
                    <Link to="#">Sport shoes</Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">Ethnic</p>

                  <li>
                    <Link to="#">Kurta</Link>
                  </li>
                  <li>
                    <Link to="#">Waistcoats</Link>
                  </li>
                  <li>
                    <Link to="#">Pyjamas</Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">winterwear</p>

                  <li>
                    <Link to="#">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="#">Sweaters</Link>
                  </li>
                  <li>
                    <Link to="#">Jackets</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Innerwear</p>
                  <li>
                    <Link to="#">Boxers</Link>
                  </li>
                  <li>
                    <Link to="#">Briefs</Link>
                  </li>
                  <li>
                    <Link to="#">Vests</Link>
                  </li>
                  <li>
                    <Link to="#">Loungewear</Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">Top Brands</p>

                  <li>
                    <Link to="#">Us Polp</Link>
                  </li>
                  <li>
                    <Link to="#">Fahrenheit</Link>
                  </li>
                  <li>
                    <Link to="#">Kappa</Link>
                  </li>
                  <li>
                    <Link to="#">Levis</Link>
                  </li>
                  <li>
                    <Link to="#">Cellio</Link>
                  </li>
                  <li>
                    <Link to="#">CODE</Link>
                  </li>
                  <li>
                    <Link to="#">Bossini</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Watches</p>

                  <li>
                    <Link>Digital </Link>
                  </li>
                  <li>
                    <Link>Analog </Link>
                  </li>
                  <li>
                    <Link>Fitness</Link>
                  </li>
                  <li>
                    <Link>Smart </Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">Sunglasses</p>

                  <li>
                    <Link>Aviator </Link>
                  </li>
                  <li>
                    <Link>Wayfarer</Link>
                  </li>
                  <li>
                    <Link>Square</Link>
                  </li>
                  <li>
                    <Link>Sporty</Link>
                  </li>
                  <li>
                    <Link>Rectangle</Link>
                  </li>
                  <li>
                    <Link>Round</Link>
                  </li>
                </ul>
              </div>
              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Shoes</p>

                  <li>
                    <Link>Loafers</Link>
                  </li>
                  <li>
                    <Link>Slip-Ons</Link>
                  </li>
                  <li>
                    <Link>Sports</Link>
                  </li>
                  <li>
                    <Link>Lace up</Link>
                  </li>
                  <li>
                    <Link>Floaters</Link>
                  </li>
                  <li>
                    <Link>Sandals</Link>
                  </li>
                  <li>
                    <Link>Sneakers</Link>
                  </li>
                  <li>
                    <Link>Boots</Link>
                  </li>
                  <li>
                    <Link>slippers</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading"> Grooming</p>
                  <li>
                    <Link>Fragrances</Link>
                  </li>
                  <li>
                    <Link>Face-wash</Link>
                  </li>
                  <li>
                    <Link>Skin care</Link>
                  </li>
                  <li>
                    <Link>Hair care</Link>
                  </li>
                  <li>
                    <Link>Beard care</Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">Add-ons</p>
                  <li>
                    <Link>Wallets</Link>
                  </li>
                  <li>
                    <Link>Ties</Link>
                  </li>
                  <li>
                    <Link>Belts</Link>
                  </li>
                  <li>
                    <Link>Socks</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        </Box>
      </Flex>
      <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="18%"
      >
        <Link to="/adoption">Adoption</Link>
      </Flex>

      <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="20%"
      >
        <Link to="/petsroom">Pet's Room</Link>
        <Box
          top="4rem"
          className="drop-down-content"
          left="-2rem"
          overflow="hidden"
          bg="white"
          pos={"absolute"}
          width="900px"
          transition={"all 0.3s"}
          height={"0vh"}
          marginTop="14px"
        >
          <Link to="#">
            <div className="main-menu">
              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Boys</p>
                  <li>
                    <Link to="#">T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="#">Shirts</Link>
                  </li>
                  <li>
                    <Link to="#">Jeans</Link>
                  </li>
                  <li>
                    <Link to="#">Trackpants</Link>
                  </li>
                  <li>
                    <Link to="#">Sweattshirts</Link>
                  </li>
                  <li>
                    <Link to="#">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="#">Pants</Link>
                  </li>
                  <li>
                    <Link to="#">Jackets</Link>
                  </li>
                  <li>
                    <Link to="#">Innerwear</Link>
                  </li>
                  <li>
                    <Link to="#">Joggers</Link>
                  </li>
                  <li>
                    <Link to="#">Ethnicwear</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Girls</p>

                  <li>
                    <Link to="#">Tops/Tees</Link>
                  </li>
                  <li>
                    <Link to="#">Dresses</Link>
                  </li>
                  <li>
                    <Link to="#">Jumpsuits</Link>
                  </li>
                  <li>
                    <Link to="#">Jeans</Link>
                  </li>
                  <li>
                    <Link to="#">Innerwear</Link>
                  </li>
                  <li>
                    <Link to="#">TrackPants</Link>
                  </li>
                  <li>
                    <Link to="#">Ethnicwear</Link>
                  </li>
                  <li>
                    <Link to="#">Shorts</Link>
                  </li>
                  <li>
                    <Link to="#">Skirts</Link>
                  </li>
                  <li>
                    <Link to="#">Joggers</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Top brands</p>
                  <li>
                    <Link to="#">Fame foreverr</Link>
                  </li>
                  <li>
                    <Link to="#">Juniors</Link>
                  </li>
                  <li>
                    <Link to="#">Melange</Link>
                  </li>
                  <li>
                    <Link to="#">Bossini</Link>
                  </li>
                  <li>
                    <Link to="#">Mini Klub</Link>
                  </li>
                  <li>
                    <Link to="#">Allen Solly</Link>
                  </li>
                  <li>
                    <Link to="#">Pepe Jeans</Link>
                  </li>
                  <li>
                    <Link to="#">Lee Cooper</Link>
                  </li>
                  <li>
                    <Link to="#">Peppermint</Link>
                  </li>
                  <li>
                    <Link to="#">Gini</Link>
                  </li>
                  <li>
                    <Link to="#">Jony</Link>
                  </li>
                </ul>
              </div>

              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Accessories</p>

                  <li>
                    <Link>Face Masks</Link>
                  </li>
                  <li>
                    <Link>Hair Accessories</Link>
                  </li>
                  <li>
                    <Link>Caps</Link>
                  </li>
                  <li>
                    <Link>Hats</Link>
                  </li>
                </ul>

                <ul>
                  <p className="category-heading">Price point Store</p>

                  <li>
                    <Link>Under 299</Link>
                  </li>
                  <li>
                    <Link>Under 399</Link>
                  </li>
                  <li>
                    <Link>Under 499</Link>
                  </li>
                  <li>
                    <Link>Under 599</Link>
                  </li>
                  <li>
                    <Link>Under 699</Link>
                  </li>
                  <li>
                    <Link>Under 799</Link>
                  </li>
                </ul>
              </div>
              <div className="hoverlist">
                <ul>
                  <p className="category-heading">Age Store</p>

                  <li>
                    <Link>0-2 yrs</Link>
                  </li>
                  <li>
                    <Link>2-4 yrs</Link>
                  </li>
                  <li>
                    <Link>4-6 yrs</Link>
                  </li>
                  <li>
                    <Link>6-10 yrs</Link>
                  </li>
                  <li>
                    <Link>10-13 yrs</Link>
                  </li>
                  <li>
                    <Link>13-16 yrs</Link>
                  </li>
                </ul>
                <ul>
                  <p className="category-heading">Shop Boys Footwear</p>
                  <p className="category-heading">Shop Girls Footwear</p>
                </ul>
              </div>
            </div>
          </Link>
        </Box>
      </Flex>

      <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="16%"
      >
        <Link to="/aboutus">About Us</Link>
      </Flex>
      <Flex
        justify={"center"}
        className="dropDown"
        height="100%"
        align={"center"}
        width="18%"
      >
        <Link to="/contactus">Contact Us</Link>
      </Flex>
    </Flex>
  );
};

export default HomeMenu;
