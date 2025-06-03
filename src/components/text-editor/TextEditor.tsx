"use client";
import { useAuth } from "@/contexts/auth-context";
import TextEditor2 from "./TextEditorContainer";
import { getIdToken } from "firebase/auth";
import TextEditorSkeleton from "./TextEditorSkeleton";
import { useQuery } from "@tanstack/react-query";

const fetchUserContent = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-content`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.log({
        errorOccured: data,
      });
      return "";
    } else {
      return data.userContent.content;
    }
  } catch (error) {
    console.log({ error });
    return "";
  }
};

const TextEditor = () => {
  const { user, loading: loadingUser } = useAuth();
  const { data: userContent, isLoading: loadingContent } = useQuery({
    queryKey: ["user-content"],
    queryFn: async () => {
      const token = await getIdToken(user!);
      return await fetchUserContent(token);
    },
    enabled: !!user,
  });

  if (loadingContent || loadingUser) {
    return <TextEditorSkeleton />;
  }

  return <TextEditor2 userContent={userContent} />;
};

export default TextEditor;
