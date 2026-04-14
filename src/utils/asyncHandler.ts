import { toast } from "react-toastify";

export async function asyncHandler<T>(
  fn: () => Promise<T>,
): Promise<[T | null, any]> {
  try {
    const data = await fn();
    return [data, null];
  } catch (error: any) {
    toast.error(error?.data?.errors[0] || "Something went wrong");

    return [null, error];
  }
}
