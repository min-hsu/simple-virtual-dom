export type TChildren = IVdom | string;

export interface IVdom {
  tagName: string;
  attrs: Record<string, any>;
  children: Array<TChildren>;
}

export type TCreateElementOption = Pick<IVdom, "attrs" | "children">;
