export const tabTypes = {
  RESOURCE: "RESOURCE",
  NOTE: "NOTE",
  DISCUSS: "DISCUSS",
  CODE: "CODE",
  TEST: "TEST",
} as const;

export type TabType = typeof tabTypes[keyof typeof tabTypes];