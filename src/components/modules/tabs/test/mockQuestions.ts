export interface QuestionType {
  id: number;
  question: string;
  options: string[];
  solution: number; // 0-indexed correct option
  explanation: string;
  topic: string;
  type: "Single Choice" | "Multiple Choice";
}

export const mockQuestions: QuestionType[] = [
  {
    id: 1,
    question: "Which TypeScript utility type constructs a type with all properties of `T` set to optional?",
    options: [
      "Required<T>",
      "Partial<T>",
      "Readonly<T>",
      "Pick<T, K>"
    ],
    solution: 1,
    explanation: "`Partial<T>` makes all properties of `T` optional. Under the hood, it is implemented as a mapped type with a `?` modifier:\n```typescript\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n```",
    topic: "Generics",
    type: "Single Choice"
  },
  {
    id: 2,
    question: "Given the custom type definition below, what is the role of the `infer` keyword?\n\n```typescript\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;\n```",
    options: [
      "Statically checks if R extends T",
      "Declares a new generic type variable R to be inferred from the return type of the function pattern",
      "Forces the return type to be any if it is not provided",
      "Casts the function to returning R at runtime"
    ],
    solution: 1,
    explanation: "The `infer` keyword inside a conditional type's `extends` clause allows declaring a new type variable (`R` in this case) that the TypeScript compiler will dynamically infer based on the matched pattern.",
    topic: "Conditional Types",
    type: "Single Choice"
  },
  {
    id: 3,
    question: "How would you define a type `GetterName<T extends string>` that transforms a string literal `'user'` into `'getUser'` using Template Literal Types?",
    options: [
      "type GetterName<T extends string> = `get${Capitalize<T>}`;",
      "type GetterName<T extends string> = `get${Uppercase<T>}`;",
      "type GetterName<T extends string> = \"get\" + T;",
      "type GetterName<T extends string> = `get${T.capitalize()}`;"
    ],
    solution: 0,
    explanation: "TypeScript template literal types support intrinsic string manipulation types like `Capitalize<T>`, `Uppercase<T>`, `Lowercase<T>`, and `Uncapitalize<T>`. Prepending `'get'` and capitalizing `T` is written as: \n```typescript\ntype GetterName<T extends string> = `get${Capitalize<T>}`;\n```",
    topic: "Template Literals",
    type: "Single Choice"
  },
  {
    id: 4,
    question: "What is the correct syntax to rename keys in a mapped type using key remapping (`as` clause)?",
    options: [
      "type Rename<T> = { [K in keyof T as NewKey]: T[K] }",
      "type Rename<T> = { [K in keyof T]: T[K] as NewKey }",
      "type Rename<T> = { [K in keyof T as `prefix_${K & string}`]: T[K] }",
      "type Rename<T> = { [K in keyof T]: T[K] } rename keyof T"
    ],
    solution: 2,
    explanation: "Mapped types can remap keys using the `as` clause. Inside the clause, we can use template literals to construct new string keys from the original keys, e.g., `[K in keyof T as \`prefix_\${K & string}\`]: T[K]`.",
    topic: "Mapped Types",
    type: "Single Choice"
  },
  {
    id: 5,
    question: "Which of the following is the correct implementation of the built-in `Omit<T, K>` utility type?",
    options: [
      "type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;",
      "type Omit<T, K extends keyof T> = Exclude<T, K>;",
      "type Omit<T, K> = { [P in keyof T as P extends K ? never : P]: T[P] };",
      "type Omit<T, K> = Pick<T, Extract<keyof T, K>>;"
    ],
    solution: 0,
    explanation: "The built-in `Omit<T, K>` utility type is defined by taking all keys of `T`, excluding those in `K` (which is `Exclude<keyof T, K>`), and then picking those keys from `T`. This is written as `Pick<T, Exclude<keyof T, K>>`.",
    topic: "Utility Types",
    type: "Single Choice"
  },
  {
    id: 6,
    question: "Why do conditional types distribute over union types when the checked type is a bare type parameter (e.g., `T extends U ? X : Y`)?",
    options: [
      "It is a compiler bug that was kept for backwards compatibility",
      "To automatically resolve unions element-by-element, returning a union of the results",
      "To prevent recursive type check overhead",
      "Because union types cannot be used in conditional expressions"
    ],
    solution: 1,
    explanation: "When a conditional type checks a bare generic parameter `T`, union inputs `A | B` distribute such that the type checks `(A extends U ? X : Y) | (B extends U ? X : Y)`. This makes conditional types act element-by-element over unions.",
    topic: "Conditional Types",
    type: "Single Choice"
  },
  {
    id: 7,
    question: "What is the correct declaration of the `NonNullable<T>` utility type?",
    options: [
      "type NonNullable<T> = T extends null | undefined ? never : T;",
      "type NonNullable<T> = T extends null ? never : T;",
      "type NonNullable<T> = Omit<T, null | undefined>;",
      "type NonNullable<T> = { [K in keyof T]: T[K] extends null ? never : T[K] };"
    ],
    solution: 0,
    explanation: "`NonNullable<T>` filters out `null` and `undefined` from `T` using a distributive conditional type checking if `T` extends `null | undefined`. If it does, it returns `never`; otherwise, it returns `T`.",
    topic: "Utility Types",
    type: "Single Choice"
  },
  {
    id: 8,
    question: "What is the difference between `never` and `unknown` in TypeScript's type system?",
    options: [
      "never represents any value; unknown represents no value",
      "never is the bottom type (no values inhabit it); unknown is the top type (every value is assignable to it)",
      "never can only be used in functions; unknown is for variable declarations",
      "There is no difference; they are aliases for any"
    ],
    solution: 1,
    explanation: "`never` is the bottom type, representing the empty set of values (nothing is assignable to it). `unknown` is the top type, meaning any value is assignable to it, but you must refine its type before performing operations on it, making it safer than `any`.",
    topic: "Utility Types",
    type: "Single Choice"
  },
  {
    id: 9,
    question: "What does the `as const` assertion do when applied to an object literal?",
    options: [
      "Compiles the object to a WebAssembly constant block",
      "Prevents properties from being modified at runtime by freezing the object",
      "Marks all properties as readonly, infers literal types for values, and turns array literals into readonly tuples",
      "Ensures the object can only contain string values"
    ],
    solution: 2,
    explanation: "The `as const` assertion (const assertion) signals the compiler that: literal types should not be widened (e.g. from `'hello'` to `string`), object properties get `readonly` modifiers, and array literals become `readonly` tuples.",
    topic: "Decorators",
    type: "Single Choice"
  },
  {
    id: 10,
    question: "What is the primary benefit of using the `satisfies` operator instead of a type annotation (e.g., `const config = { ... } satisfies Config` vs `const config: Config = { ... }`)?",
    options: [
      "It validates the object against the type but preserves the most specific inferred type of the object",
      "It runs runtime checks to validate the object structure",
      "It automatically adds default values for missing properties",
      "It makes the object mutable even if the type specified readonly properties"
    ],
    solution: 0,
    explanation: "The `satisfies` operator enables us to validate that an expression matches some type, without changing the inferred type of that expression. This preserves literal types and specific properties, unlike a standard type annotation which widens the type.",
    topic: "Utility Types",
    type: "Single Choice"
  }
];
