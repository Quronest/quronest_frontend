"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const PrivateLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { isAuthenticated, isLoadingUser, user } = useAuth();
  useEffect(() => {
    if (!isLoadingUser) {
      if (!isAuthenticated) router.push("/login");
      else {
        const user_status = user!.account_status;
        switch (user_status) {
          case "PERSONAL_DATA_INCOMPLETE":
            router.push("/profile-details?tab=0");
            break;
          case "ACADEMIC_DATA_INCOMPLETE":
            router.push("/profile-details?tab=1");
            break;
          // case "JOURNEY_START_INCOMPLETE":
          //   router.push("/profile-details?tab=2");
          //   break;
          default:
            router.push("/home");
        }
      }
    }
  }, [isAuthenticated, user, isLoadingUser]);

  return <div>{children}</div>;
};
