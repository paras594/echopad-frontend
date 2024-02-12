"use server";

export const registerUser: any = async (currentState: any, formData: any) => {
  "use server";

  const { name, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: "Passwords do not match",
      },
    };
  }

  if (password.length < 5) {
    return {
      errors: {
        password: "Password must be at least 5 characters",
      },
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        cache: "no-cache",
      }
    );
    const data = await res.json();

    console.log({ data });

    if (!res.ok) {
      return { errors: { error: data.message } };
    }

    return { success: true };
  } catch (error) {
    console.log({ error });
    return {
      errors: {
        error: "Something went wrong",
      },
    };
  }
};
