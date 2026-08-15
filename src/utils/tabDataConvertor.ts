import { routes } from "@/hooks/useTabNavigation";
import {
  DiscussTabPayloadType,
  NoteTabPayloadType,
  TabData,
  TaskTabPayloadType,
} from "@/types/WorkspaceType";

export type RawTabDataType = {
  id?: string;
  title: string;
  path: string;
  payload: TaskTabPayloadType | NoteTabPayloadType | DiscussTabPayloadType;
};

export const tabDataConvertor = ({
  id,
  title,
  path,
  payload,
}: RawTabDataType): TabData => {
  const tab_id = id ?? crypto.randomUUID();
  const routeObj = routes.find((route) => route.path === path);
  return {
    id: tab_id,
    title,
    path,
    payload,
  };
};
