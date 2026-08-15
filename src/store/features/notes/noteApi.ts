import { NoteType } from "@/types/NoteType";
import { baseApi } from "../baseApi";
import { AnchorTypes } from "@/enums/AnchorEnums";

export interface AnchorOffset {
  start: number;
  end: number;
}

export interface AnchorDto {
  id: string;
  reference_id: string;
  type: AnchorTypes;
  block_offset: AnchorOffset;
  selection_offset: AnchorOffset;
  selected_text: string;
  creation_timestamp: string;
  update_timestamp: string | null;
}



export interface AnchorCreateInput {
  type: AnchorTypes;
  block_offset: AnchorOffset;
  selection_offset: AnchorOffset;
  selected_text: string;
}

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
      query: ({
        taskId,
        page,
        size = 20,
        sort = "creationTimestamp,desc",
      }) => ({
        url: "notes",
        params: { taskId, page, size, sort },
      }),
    }),
    createNote: builder.mutation<
      NoteType,
      {
        taskId: string;
        reference_text?: string;
        message: string;
        anchor?: AnchorCreateInput;
      }
    >({
      query: ({ taskId, reference_text, message, anchor }) => ({
        url: `notes/${taskId}`,
        method: "POST",
        body: { reference_text, message, anchor },
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
