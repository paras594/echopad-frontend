import Container from "@/components/Container";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <div>
      <Container>
        <h1 className="prose-2xl font-bold text-center mb-8  mt-12">
          Register
        </h1>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default Register;
