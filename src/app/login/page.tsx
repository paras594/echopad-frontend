import FirebaseLoginForm from "@/components/auth-forms/firebase-login-form/firebase-login-form";
import Container from "@/components/Container";
import Version from "@/components/Version";

const Login = () => {
  return (
    <div>
      <Container>
        <h1 className="prose-2xl font-bold text-center mb-8 mt-12">Login</h1>
        <FirebaseLoginForm />
      </Container>
      <Version version="2.1" />
    </div>
  );
};

export default Login;
