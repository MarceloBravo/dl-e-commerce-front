import { ClassTypeEnum } from '../enum/classTypeEnum';

export interface MsgErrors{
    message: string,
    class: typeof ClassTypeEnum
}