import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Image,
    Text,
    useDisclosure,
    useToast
  } from "@chakra-ui/react";
  import React from "react";
  import { Link } from "react-router-dom";
  import { GiHamburgerMenu } from "react-icons/gi";
  import { useDispatch, useSelector } from "react-redux";
  
  function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
  
    const user = useSelector((state) => state.user);
  
    return (
      <>
        <Button
          onClick={onOpen}
          colorScheme="green"
          size="md"
          _hover={{ bg: "green" }}
        >
          <GiHamburgerMenu size={"18px"} />
        </Button>
  
        <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"pink.600"} fontSize="3xl" />
            <DrawerHeader width="28%">
              <Image src="../../../images/logo.png" />
            </DrawerHeader>
            <DrawerBody>
              <DrawerCloseButton />
  
              <Flex
                justify="center"
                pl="1rem"
                gap="5"
                flexDir={"column"}
                mx="2rem"
                mt="2rem"
              >
                <Link to="/">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Home
                  </Text>
                </Link>
                <Link to="/dogspage">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Dogs
                  </Text>
                </Link>
                <Link to="/catspage">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Cats
                  </Text>
                </Link>
  
                <Link to="/">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Pet's Room
                  </Text>
                </Link>
  
                <Link to="/aboutus">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    About-us
                  </Text>
                </Link>
                <Link to="/contactus">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Contact-us
                  </Text>
                </Link>
                <Link to="/shoppingCart">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Your Cart
                  </Text>
                </Link>
                <Link to="/profilePage">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease"
                    }}
                  >
                    Profile
                  </Text>
                </Link>
                <Flex justify={"center"} gap={3}>
                  {user ? (
                    <Link to="/">
                      <Button
                        px="2rem"
                        colorScheme={"green"}
                        onClick={() => {
                          // dispatch(logout);
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
                        Logout
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Button
                        px="2rem"
                        colorScheme={"yellow"}
                        _hover={{ bg: "pink" }}
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  export default SideBar;
  