import { NoteType } from "@/types/NoteType";
import { baseApi } from "../baseApi";
import { SelectionAnchor } from "@/types/WorkspaceType";

// export interface NoteType {
//   id: string;
//   task_id: string;
//   reference_text: string | null;
//   message: string;
//   creation_timestamp: string;
//   update_timestamp: string | null;
// }

export interface PageResponse<T> {
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const noteApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotes: builder.query<
      PageResponse<NoteType>,
      { taskId: string; page: number; size?: number; sort?: string }
    >({
      query: ({ taskId, page, size = 20, sort = "creationTimestamp,desc" }) => ({
        url: "notes",
        params: { taskId, page, size, sort },
      }),
    }),
    createNote: builder.mutation<
      NoteType,
      { taskId: string; reference_text?: string; message: string, anchor?:SelectionAnchor }
    >({
      query: ({ taskId, reference_text, message }) => ({
        url: `notes/${taskId}`,
        method: "POST",
        body: { reference_text, message },
      }),
    }),
    editNote: builder.mutation<NoteType, { noteId: string; message: string }>({
      query: ({ noteId, message }) => ({
        url: `notes/${noteId}`,
        method: "PATCH",
        body: { message },
      }),
    }),
    deleteNote: builder.mutation<void, { noteId: string }>({
      query: ({ noteId }) => ({
        url: `notes/${noteId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetNotesQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = noteApi;
