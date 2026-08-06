export const ClassTypeEnum = { 
    ERROR: 'error',
    SUCCESS: 'succes'
} as const;

export type InputTypeEnum = typeof ClassTypeEnum[keyof typeof ClassTypeEnum];
