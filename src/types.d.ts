declare type TChildren = IVdom;

declare interface IVdom {
  tagName: string;
  attrs: Record<string, any>;
  children: Array<TChildren>;
}

declare type TCreateElementOption = Pick<IVdom, "attrs" | "children">;
