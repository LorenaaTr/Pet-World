import {
  Box,
  Flex,
  Image,
  Popover,
  Text,
  MenuGroup,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import HomeMenu from "./HomeMenu";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import NavbarTop from "./NavbarTop";
import { setUser } from "../../../slices/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [cartItemsLength, setCartItemsLength] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const user = useSelector((state) => state.user);

  // const handleLogout = async () => {
  //   // Send a request to the server to log the user out
  //   try {
  //     await axios.get("http://localhost:3001/logout");
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // Clear local storage or perform any other necessary cleanup

  // };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/auth/logout");
    } catch (error) {
      console.log(error);
    }
    removeCookie("token");
    window.localStorage.removeItem("jwt");

    navigate("/login");
    window.location.reload();
  };

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      const { displayName } = data.user;
      dispatch(setUser(displayName));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getCartItemsLength = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/cart`;
      const response = await axios.get(url, { withCredentials: true });
      const { cartItems } = response.data;
      setCartItemsLength(cartItems.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartItemsLength();
  }, []);

  return (
    <Box
      position={"sticky"}
      top="0"
      zIndex={"100"}
      bg="#f7f8f7"
      width="100%"
      boxShadow=" 0px 7px 7px -5px rgba(170, 159, 170, 0.2)"
    >
      <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
        <NavbarTop />
      </Box>

      <Flex
        height={{ base: "3.2rem", md: "4.94rem" }}
        px={{ base: "1rem", md: "3rem" }}
        justify={"space-between"}
        gap={{ base: "0.5rem", sm: "1rem", md: "2rem", lg: "2rem" }}
        align={"center"}
        width="90%"
        margin="auto"
      >
        <Box display={{ lg: "none" }}>
          <SideBar />
        </Box>

        <Link to="/">
          <Box minW={"6rem"}>
            <Image
              src="../../images/logo.png"
              alt="logo"
              margin={"auto"}
              width={{ base: "90%", sm: "60%", md: "60%", lg: "100%" }}
              height={{ base: "2rem", md: "100%" }}
            />
          </Box>
        </Link>

        <Box
          minWidth={"30%"}
          width="90%"
          display={{ base: "none", lg: "block" }}
        >
          <HomeMenu />
        </Box>

        <Box
          minWidth={"30%"}
          width="90%"
          display={{ base: "none", lg: "block" }}
        >
          <SearchBar />
        </Box>

        <Flex gap={{ base: "0.5rem", md: "1.5rem" }} align="center">
          <Popover>
            <Menu>
              <MenuButton>
                <BsPerson fontSize={"1.3rem"} />
              </MenuButton>

              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem color="pink.400">
                    {user.firstName || user.displayName
                      ? `Hey, ${user.firstName || user.displayName}`
                      : ""}
                  </MenuItem>
                  {user.firstName ? (
                    <>
                      <MenuItem onClick={() => navigate("/profilePage")}>
                        My Profile
                      </MenuItem>
                    </>
                  ) : (
                    ""
                  )}

                  {user.role === "admin" || user.role === "manager" ? (
                    <>
                      <MenuItem
                        _hover={{ backgroundColor: "green" }}
                        onClick={() => {
                          navigate("/dashboard");
                        }}
                      >
                        Dashboard
                      </MenuItem>
                    </>
                  ) : (
                    ""
                  )}
                  <MenuItem
                    _hover={{ backgroundColor: "green" }}
                    onClick={() => {
                      navigate("/userOrders");
                    }}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem>Reviews</MenuItem>
                </MenuGroup>

                {user.firstName !== "" || user.displayName ? (
                  <MenuItem
                    _hover={{ backgroundColor: "pink" }}
                    backgroundColor="#fdb852"
                    onClick={() => {
                      handleLogout();

                      toast({
                        title: "User Logout Successfully.",
                        description: "Come Back Again Soon",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top"
                      });
                    }}
                  >
                    Sign Out
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem
                      _hover={{ backgroundColor: "green" }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Sign In
                    </MenuItem>
                    <MenuItem
                      _hover={{ backgroundColor: "green" }}
                      // backgroundColor="#fdb852"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Sign Up
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Popover>
          <Link to="/wishlist">
            <Flex flexDir={"column"} align={"center"}>
              <Text>
                <AiOutlineHeart fontSize={"1.3rem"} />
              </Text>
            </Flex>
          </Link>

          <Link to="/shoppingCart">
            <Flex flexDir={"column"} align={"center"} pos="relative">
              <Text>
                <BsBag fontSize={"1.3rem"} />
              </Text>
              <Box
                justify={"center"}
                align="center"
                pos={"absolute"}
                top="-5px"
                right="-12px"
                width="20px"
                height="20px"
                color="white"
                borderRadius={"50%"}
                bg="#d53f8c"
              >
                <Text> {cartItemsLength}</Text>
              </Box>
            </Flex>
          </Link>
        </Flex>
      </Flex>

      <Box padding={"8px"} display={{ lg: "none" }} width="90%" margin="auto">
        <SearchBar />
      </Box>
    </Box>
  );
};

export default Navbar;
