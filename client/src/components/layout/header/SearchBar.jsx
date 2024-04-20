import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/dogspage?name=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  /*const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };*/

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box borderRadius={"md"} pos="relative">
      <InputGroup>
        <InputLeftElement children={<BsSearch color="gray.300" />} />
        <Input
          type="text"
          outline="none"
          placeholder="What are you looking for?"
          backgroundColor={"#ffffff"}
          _focus={{
            boxShadow: "none",
            border: "1px solid #f89f17",
            outline: "none"
          }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyPress={handleKeyPress}
        />
      </InputGroup>
    </Box>
  );
}

export default SearchBar;
