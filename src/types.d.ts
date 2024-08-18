declare type IProps = Record<string, any>;

declare type IChildren = IVdom | string;

declare interface IVdom {
  readonly tagName: string;
  readonly attrs: IProps;
  readonly children: ReadonlyArray<IChildren>;
}

declare type TNode = HTMLElement | Text;
