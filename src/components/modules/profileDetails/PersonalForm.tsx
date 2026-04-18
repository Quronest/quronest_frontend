import { UseFormRegister } from "react-hook-form";
import Input from "@/components/ui/Input";

type Props = {
  register: UseFormRegister<any>;
};

export default function PersonalStep({ register }: Props) {
  return (
    <div className=" flex flex-col justify-center items-center space-y-4">
      <h2 className="text-lg font-semibold">Personal Data</h2>

      <Input
        placeholder="Interested Domains"
        {...register("interested_domains")}
      />
      <Input placeholder="Skills" {...register("skills")} />
      <Input placeholder="Primary Goal" {...register("primary_goal")} />
      <Input placeholder="Experience" {...register("experience")} />
      <Input placeholder="Description" {...register("personal_description")} />
    </div>
  );
}
