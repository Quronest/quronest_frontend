"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AvatarUpload from "./AvatarUpload";
import BasicInformation from "./BasicInformation";
import FooterActions from "./FooterActions";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";

import {
  editProfileSchema,
  type EditProfileSchemaType,
} from "@/schemas/editProfileSchema";

export default function EditProfile() {
  const methods = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      avatar: "",
      fullName: "",
      username: "",
      bio: "",
      location: "",
      socials: {
        github: "",
        linkedin: "",
        website: "",
      },
      skills: [],
    },
  });

  const onSubmit = (data: EditProfileSchemaType) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mx-auto mt-6 max-w-5xl space-y-8">
          <AvatarUpload />
          <BasicInformation />
          <SocialLinks />
          <Skills />
          <FooterActions />
        </div>
      </form>
    </FormProvider>
  );
}
