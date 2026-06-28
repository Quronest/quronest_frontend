import { DiscussionType } from "@/types/DiscussionType";

export const mockDiscussion: DiscussionType = {
  id: "discussion-1",

  title: "Understanding the Virtual DOM",

  resourceId: "react-basics",

  messages: [
    {
      id: "message-1",
      role: "user",
      content: "Why does React use a Virtual DOM?",

      createdAt: "2026-06-28T10:00:00.000Z",

      anchor: {
        resourceId: "react-basics",

        block: {
          startOffset: 0,
          endOffset: 120,
        },

        selection: {
          startOffset: 18,
          endOffset: 29,
        },

        selectedText: "Virtual DOM",
      },
    },

    {
      id: "message-2",
      role: "assistant",
      createdAt: "2026-06-28T10:00:05.000Z",

      content: `
## Why does React use a Virtual DOM?

The **Virtual DOM** is a lightweight JavaScript representation of the real DOM.

Instead of updating the browser DOM after every state change, React:

1. Creates a new Virtual DOM tree.
2. Compares it with the previous tree (**diffing**).
3. Updates only the nodes that changed.

### Example

\`\`\`tsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
\`\`\`

This makes UI updates predictable while avoiding unnecessary DOM operations.
      `,
    },

    {
      id: "message-3",
      role: "user",
      createdAt: "2026-06-28T10:01:20.000Z",

      content: "How is this different from directly manipulating the DOM?",
    },

    {
      id: "message-4",
      role: "assistant",
      createdAt: "2026-06-28T10:01:28.000Z",

      content: `
Direct DOM manipulation requires you to manually find and update elements.

With React, you describe **what the UI should look like**, and React figures out **how to update the DOM efficiently**.

Think of it like this:

- **Vanilla JavaScript:** Tell the browser *how* to update the page.
- **React:** Describe *what* the page should look like after the state changes.
      `,
    },
  ],
};
