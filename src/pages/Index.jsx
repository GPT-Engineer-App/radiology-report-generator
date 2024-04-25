import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, Textarea, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaSave } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reports, setReports] = useState(() => JSON.parse(localStorage.getItem("reports")) || []);
  const [currentReport, setCurrentReport] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    // Simple authentication simulation
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      toast({
        title: "Logged in",
        description: "You have successfully logged in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const saveReport = () => {
    const newReports = [...reports, currentReport];
    setReports(newReports);
    localStorage.setItem("reports", JSON.stringify(newReports));
    setCurrentReport("");
    toast({
      title: "Report Saved",
      description: "Your report has been saved locally.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container>
      {!isLoggedIn ? (
        <VStack spacing={4}>
          <Heading>Login</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Heading>Radiology Report Generator</Heading>
          <Textarea placeholder="Write the radiology report here..." value={currentReport} onChange={(e) => setCurrentReport(e.target.value)} />
          <Button leftIcon={<FaSave />} onClick={saveReport}>
            Save Report
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
          <Box>
            <Heading size="md">Saved Reports</Heading>
            {reports.map((report, index) => (
              <Text key={index} p={2} border="1px" borderColor="gray.200" my={2}>
                {report}
              </Text>
            ))}
          </Box>
        </VStack>
      )}
    </Container>
  );
};

export default Index;
