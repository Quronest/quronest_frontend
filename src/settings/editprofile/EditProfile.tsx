"use client";

import { FormProvider, useForm } from "react-hook-form";

import AvatarUpload from "./AvatarUpload";
import BasicInformation from "./BasicInformation";
import FooterActions from "./FooterActions";
import ProfileHeader from "./ProfileHeader";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";

import type { EditProfileForm } from "../../types/EditProfiletypes";

export default function EditProfile() {
  const methods = useForm<EditProfileForm>({
    mode: "onBlur",
    defaultValues: {
      avatar: "",

      fullName: "",
      username: "",
      email: "",
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

  const { handleSubmit } = methods;

  const onSubmit = async (data: EditProfileForm) => {
    console.log("Form Submitted");
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Save completed");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-8 px-6 py-8 lg:px-10 xl:px-12"
      >
        <ProfileHeader />

        <div className="space-y-8 max-w-5xl mx-auto">
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
