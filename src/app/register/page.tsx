import Container from "@/components/Container";
import FirebaseRegisterForm from "@/components/firebase-register-form/firebase-register-form";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <div>
      <Container>
        <h1 className="prose-2xl font-bold text-center mb-8  mt-12">
          Register
        </h1>
        {/* <RegisterForm /> */}
        <FirebaseRegisterForm />
        <p className="text-center mt-20 text-gray-300">v2.0</p>
      </Container>
    </div>
  );
};

export default Register;
