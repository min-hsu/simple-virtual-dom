import { createElement } from "./vdom/createElement";
import { render } from "./vdom/render";
import { mount } from "./vdom/mount";
import { diff } from "./vdom/diff";

let count = 0;

const createVApp = ({ count }: IProps) =>
  createElement("div", {
    attrs: { id: "app", dataCount: count },
    children: [
      createElement("input"),
      String(count),
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

let vApp = createVApp({ count });
const $app = render(vApp);
let $rootElement = mount($app, document.querySelector("#app") as HTMLElement);

setInterval(() => {
  // count++;
  const vNewApp = createVApp({ count });
  const patch = diff(vApp, vNewApp);
  $rootElement = patch($rootElement)!;
  vApp = vNewApp;
}, 1000);
