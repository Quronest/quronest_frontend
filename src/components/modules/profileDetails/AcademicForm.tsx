import { UseFormRegister } from "react-hook-form";
import Input from "@/components/ui/Input";

type Props = {
  register: UseFormRegister<any>;
};

export default function AcademicForm({ register }: Props) {
  return (
    <div className=" flex flex-col justify-center items-center space-y-4">
      <h2 className="text-lg font-semibold">Academic Data</h2>

      <Input placeholder="Institute Name" {...register("institute_name")} />
      <Input placeholder="Grade" {...register("grade")} />
      <Input placeholder="Course" {...register("course")} />
      <Input placeholder="Description" {...register("academic_description")} />
    </div>
  );
}
