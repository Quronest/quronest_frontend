"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Card } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

import {
  generalSettingsSchema,
  type GeneralSettingsSchemaType,
} from "@/schemas/generalSettingsSchema";

const GeneralSettings = () => {
  const methods = useForm<GeneralSettingsSchemaType>({
    resolver: zodResolver(generalSettingsSchema),
    mode: "onBlur",
    defaultValues: {
      instituteName: "",
      grade: "",
      course: "",
      academicDescription: "",
      interestedDomains: "",
      skills: "",
      primaryGoal: "",
      experience: "",
      personalDescription: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const academicDescription = watch("academicDescription") ?? "";
  const personalDescription = watch("personalDescription") ?? "";

  const onSubmit = (data: GeneralSettingsSchemaType) => {
    console.log(data);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              General Settings
            </h1>

            <p className="mt-2 text-sm text-neutral">
              Update your academic and personal information.
            </p>
          </div>

          <Card className="rounded-3xl bg-card p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Academic Details</h2>

                <p className="mt-1 text-sm text-neutral">
                  Keep your educational information up to date.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label variant="secondary">Institute Name</Label>

                  <Input
                    placeholder="XYZ University"
                    error={errors.instituteName?.message}
                    {...register("instituteName")}
                  />
                </div>

                <div className="space-y-2">
                  <Label variant="secondary">Grade</Label>

                  <Input
                    placeholder="CGPA / Percentage"
                    error={errors.grade?.message}
                    {...register("grade")}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label variant="secondary">Course</Label>

                  <Input
                    placeholder="Computer Science"
                    error={errors.course?.message}
                    {...register("course")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label variant="secondary">Academic Description</Label>

                  <span className="text-xs text-neutral">
                    {academicDescription.length}/300
                  </span>
                </div>

                <TextArea
                  placeholder="Tell us about your academics..."
                  maxLength={300}
                  minHeight={120}
                  maxHeight={220}
                  className="border border-border bg-transparent shadow-none focus:ring-0"
                  {...register("academicDescription")}
                />
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl bg-card p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Personal Details</h2>

                <p className="mt-1 text-sm text-neutral">
                  Share your interests, goals, and experience.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label variant="secondary">Interested Domains</Label>

                  <Input
                    placeholder="AI, Web Development"
                    error={errors.interestedDomains?.message}
                    {...register("interestedDomains")}
                  />
                </div>

                <div className="space-y-2">
                  <Label variant="secondary">Skills</Label>

                  <Input
                    placeholder="React, Node.js, Python"
                    error={errors.skills?.message}
                    {...register("skills")}
                  />
                </div>

                <div className="space-y-2">
                  <Label variant="secondary">Primary Goal</Label>

                  <Input
                    placeholder="Become a Full Stack Developer"
                    error={errors.primaryGoal?.message}
                    {...register("primaryGoal")}
                  />
                </div>

                <div className="space-y-2">
                  <Label variant="secondary">Experience</Label>

                  <Input
                    placeholder="2 Years"
                    error={errors.experience?.message}
                    {...register("experience")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label variant="secondary">Personal Description</Label>

                  <span className="text-xs text-neutral">
                    {personalDescription.length}/300
                  </span>
                </div>

                <TextArea
                  placeholder="Tell us about yourself..."
                  maxLength={300}
                  minHeight={120}
                  maxHeight={220}
                  className="border border-border bg-transparent shadow-none focus:ring-0"
                  {...register("personalDescription")}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="rounded-xl px-8"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default GeneralSettings;
