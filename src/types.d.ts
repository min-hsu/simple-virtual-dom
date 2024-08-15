declare type IChildren = IVdom | string;

declare interface IVdom {
  tagName: string;
  attrs: Props;
  children: Array<IChildren>;
}

declare interface ICreateElementOption {
  attrs?: Props;
  children?: Array<IChildren>;
}

declare type Props = Record<string, any>;

declare type TNode = HTMLElement | Text;
