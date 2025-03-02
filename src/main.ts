import { createElement } from "./vdom/createElement";
import { render } from "./vdom/render";
import { mount } from "./vdom/mount";
import { diff } from "./vdom/diff";

const createVApp = ({ count }: Props) =>
  createElement("div", {
    attrs: { id: "app", count },
    children: [
      createElement("input"),
      String(count),
      // createElement("img", {
      //   attrs: {
      //     width: 100,
      //     src: "https://media.giphy.com/media/JgWZYoIgjzsIQO8joZ/giphy.gif",
      //   },
      // }),
      ...Array.from({ length: count }, () =>
        createElement("img", {
          attrs: {
            width: 100,
            src: "https://media.giphy.com/media/JgWZYoIgjzsIQO8joZ/giphy.gif",
          },
        })
      ),
    ],
  });

let count = 0;
let vApp = createVApp({ count });
const $app = render(vApp); // 用 $ 開頭代表是真的 DOM 節點
console.log($app);

let $rootElement = mount($app, document.getElementById("app")!);

setInterval(() => {
  // count++;
  // const vNewApp = createVApp({ count });
  // const $app = render(vNewApp);
  // $rootElement = mount($app, $rootElement);
  const vNewApp = createVApp({ count: 1 + Math.floor(Math.random() * 5) });
  const patch = diff(vApp, vNewApp);
  $rootElement = patch($rootElement)!;
  vApp = vNewApp;
}, 1000);
