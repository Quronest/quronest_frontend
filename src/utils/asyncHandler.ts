import { toast } from "react-toastify";

export async function asyncHandler<T>(
  fn: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error: any) {
    toast.error(error?.data?.errors[0] || "Something went wrong");
  }
}
