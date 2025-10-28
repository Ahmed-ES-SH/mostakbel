import ar from "./ar.json";
import en from "./en.json";

// Automatically infer the structure of translation files
export type Messages = typeof ar;

// Helper types to generate all nested keys like "mainMeta.title"
type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

export type NestedKeyOf<ObjectType, Depth extends number = 5> = [
  Depth
] extends [never]
  ? never
  : ObjectType extends object
  ? {
      [Key in keyof ObjectType &
        (string | number)]: ObjectType[Key] extends object
        ? Key | Join<Key, NestedKeyOf<ObjectType[Key], Prev[Depth]>>
        : Key;
    }[keyof ObjectType & (string | number)]
  : never;

export type TranslationKey = NestedKeyOf<Messages>;
