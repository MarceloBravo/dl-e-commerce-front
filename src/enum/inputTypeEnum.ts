export const InputTypeEnum = {
    CHECKBOX: 'checkbox',
    RADIO: 'radio'
} as const;

export type InputTypeEnum = typeof InputTypeEnum[keyof typeof InputTypeEnum];