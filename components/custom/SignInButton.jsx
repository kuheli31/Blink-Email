"use client";

import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function SignInButton() {
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("OAuth Token Response:", tokenResponse);

      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: "Bearer " + tokenResponse?.access_token },
          }
        );

        console.log("Google User Info:", userInfo.data);

        const user = userInfo.data;

        console.log("Sending to Convex:", {
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
        });

        //Save to DataBase
        const result = await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
        });

        const userDetail = {...user, _id: result?.id??result};
        if (typeof window !== "undefined") {
          localStorage.setItem("userDetail", JSON.stringify(userDetail));
        }

        console.log("User successfully saved in Convex!");
      } catch (error) {
        console.error("Error in Google Login or Convex:", error);
      }
    },
    onError: (errorResponse) => console.log("Google Login Error:", errorResponse),
  });

  return (
    <div>
      <Button onClick={googleLogin}>Get Started</Button>
    </div>
  );
}

export default SignInButton;
