import { ConversationWithMessages } from "./types";

export const mockConversations: ConversationWithMessages[] = [
  {
    id: "1",
    title: "Binary Search",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:05:00Z",
    messages: [
      {
        id: "1",
        role: "user",
        content: "Explain Binary Search.",
        createdAt: "2026-08-01T10:00:00Z",
        status: "completed",
      },
      {
        id: "2",
        role: "assistant",
        createdAt: "2026-08-01T10:00:05Z",
        status: "completed",
        content: `# Binary Search

Binary Search is an efficient algorithm for searching a sorted array.

## Complexity

| Case | Time |
|------|------|
| Best | O(1) |
| Average | O(log n) |
| Worst | O(log n) |

\`\`\`cpp
int binarySearch(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target)
            return mid;

        if (nums[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }

    return -1;
}
\`\`\`
`,
      },
    ],
  },
  {
    id: "2",
    title: "React Hooks",
    createdAt: "2026-08-02T09:00:00Z",
    updatedAt: "2026-08-02T09:15:00Z",
    messages: [
      {
        id: "3",
        role: "user",
        content: "What is useEffect?",
        createdAt: "2026-08-02T09:00:00Z",
        status: "completed",
      },
      {
        id: "4",
        role: "assistant",
        createdAt: "2026-08-02T09:00:05Z",
        status: "completed",
        content: `# useEffect

The **useEffect** hook lets you synchronize a component with external systems.

## Common Uses

- Fetch data
- Listen to events
- Update the document title
- Start timers

\`\`\`tsx
useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Unmounted");
  };
}, []);
\`\`\`
`,
      },
    ],
  },
  {
    id: "3",
    title: "New Chat",
    createdAt: "2026-08-03T11:00:00Z",
    updatedAt: "2026-08-03T11:00:00Z",
    messages: [],
  },
];

export const TOPIC_OPTIONS: string[] = [
  "Ask Doubt",
  "Code Review",
  "Concept Explanation",
  "Debugging & Error Help",
  "System Design",
  "Interview Prep",
];
