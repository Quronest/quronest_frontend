# Agent Instructions and Guidelines

This document outlines the coding standards, patterns, and guidelines for development in this repository.

## Next.js and TypeScript Best Practices

- Keep `page.tsx` files as pure Server Components. They must never contain `use client`.
- Move any client-side interactivity (state, hooks, event listeners) into imported components under the components directory.
- Use strict TypeScript. Avoid using the `any` type under all circumstances. Always define precise types or interfaces for component props.
- Extensively use absolute import paths prefixed with `@/` (e.g., `@/components/ui/Button`, `@/store/store`).

## Component Architecture and Reusability

- Focus heavily on creating generic, reusable components to eliminate duplicate code.
- Create components in the global components folder if and only if they are generic, reusable, and required in multiple contexts.
- Use the following folder structure under `src/components/` for new components:
  - `src/components/ui/`: Low-level, generic, stateless, or UI-only primitive components (e.g., `Button`, `Input`, `Card`).
  - `src/components/modules/`: Domain-specific components that are reused across different views or routes.
- If a component is specific to only one page, co-locate it within that page folder instead of polluting the global components folder.

## Styling Standards

- Use Tailwind CSS v4 class naming conventions.
- Combine and handle conditional classes dynamically using `clsx`.
- Ensure components are responsive and adapt fluidly to screen sizes.

## Clean Code and Commenting Rules

- Write clean, self-documenting code. Use descriptive variable and function names.
- Do not write long or unnecessary comments. Avoid comments that describe "what" the code does. Only add minimal, clear comments to explain the "why" when dealing with complex or non-obvious logic.
- Avoid using special AI characters, specifically unicode em-dashes or en-dashes. Use standard hyphens (-) or colons (:) instead.
