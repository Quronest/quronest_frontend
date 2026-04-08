import { toast } from "react-toastify";

export async function asyncHandler<T>(
  fn: () => Promise<T>,
): Promise<[T | null, any]> {
  try {
    console.log("Inside async handler try block");

    const data = await fn();
    return [data, null];
  } catch (error: any) {
    console.log(error)
    // toast.error(error?.data?.errors[0] || "Something went wrong");

    return [null, error];
  }
}
