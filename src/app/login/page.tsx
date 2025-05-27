import Container from "@/components/Container";
import FirebaseLoginForm from "@/components/firebase-login-form/firebase-login-form";
import LoginForm from "@/components/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div>
      <Container>
        <h1 className="prose-2xl font-bold text-center mb-8 mt-12">Login</h1>
        {/* <LoginForm /> */}
        <FirebaseLoginForm />
        <p className="text-center mt-20 text-gray-300">v2.0</p>
      </Container>
    </div>
  );
};

export default Login;
