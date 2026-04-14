import { toast } from "react-toastify";

export async function asyncHandler<T>(
  fn: () => Promise<T>,
): Promise<{ data: T | null; error: any }> {
  try {
    const data = await fn();
    return {data, error: null};
  } catch (error: any) {
    toast.error(error?.data?.errors[0] || "Something went wrong");

    return {data: null, error};
  }
}
