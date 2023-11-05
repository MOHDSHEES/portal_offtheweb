import Login from "@/components/register.js/login";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import Layout from "@/components/layout";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // if (session) {
  //   router.replace("/");
  // }
  useEffect(() => {
    if (session && session.user) router.replace("/dashboard");
  }, [session]);
  if (!session) {
    return (
      <div>
        <Login />
      </div>
    );
  }
};

export default SignIn;
