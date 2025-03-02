declare type Props = Record<string, any>;

declare type Children = VDom | string;

declare interface VDom {
  readonly tagName: string;
  readonly attrs: Props;
  readonly children: ReadonlyArray<Children>;
}

declare type TNode = HTMLElement | Text;
