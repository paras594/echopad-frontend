import FirebaseRegisterForm from "@/components/auth-forms/firebase-register-form/firebase-register-form";
import Container from "@/components/Container";
import Version from "@/components/Version";

const Register = () => {
  return (
    <div>
      <Container>
        <h1 className="prose-2xl font-bold text-center mb-8  mt-12">
          Register
        </h1>
        <FirebaseRegisterForm />
      </Container>
      <Version version="2.1" />
    </div>
  );
};

export default Register;
