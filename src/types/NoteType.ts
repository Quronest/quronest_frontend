import { SelectionAnchor } from "./WorkspaceType";

export type NoteType = {
  id: string;
  taskId: string;
  anchor?: SelectionAnchor;

  content: string;

  createdAt: string;
  updatedAt?: string;
};

// const mockNotes: NoteType[] = [
//   {
//     id: "note-1",
//     content:
//       "This section explains how React manages state efficiently using hooks. Need to revise useEffect dependencies.",
//     referenceText: "React manages state efficiently using hooks",
//     createdAt: new Date("2026-04-20T10:15:00").toISOString(),
//   },
//   {
//     id: "note-2",
//     content:
//       "Important: RTK Query simplifies data fetching a lot. Look into caching and invalidation strategies later.",
//     referenceText: "RTK Query simplifies data fetching",
//     createdAt: new Date("2026-04-20T11:30:00").toISOString(),
//   },
//   {
//     id: "note-3",
//     content:
//       "This part about closures is confusing. Revisit with examples and maybe write small test code.",
//     referenceText: "closures in JavaScript",
//     createdAt: new Date("2026-04-21T09:10:00").toISOString(),
//   },
//   {
//     id: "note-4",
//     content:
//       "Good explanation of async/await vs promises. Could be useful for interview prep.",
//     referenceText: "async/await vs promises",
//     createdAt: new Date("2026-04-21T14:45:00").toISOString(),
//   },
//   {
//     id: "note-5",
//     content:
//       "Need to implement this debounce logic in my project. Check lodash implementation as well.",
//     referenceText: "debounce function implementation",
//     createdAt: new Date("2026-04-22T08:20:00").toISOString(),
//   },
// ];
