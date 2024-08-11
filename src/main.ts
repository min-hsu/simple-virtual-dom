import { createElement } from "./vdom/createElement";
import { render } from "./vdom/render";
import { mount } from "./vdom/mount";
import { diff } from "./vdom/diff";

const createVApp = ({ count }: Props) =>
  createElement("div", {
    attrs: { id: "app", dataCount: count },
    children: [
      String(count),
      createElement("input"),
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/JgWZYoIgjzsIQO8joZ/giphy.gif",
        },
      }),
    ],
  });

let count = 0;
let vApp = createVApp({ count });
const $app = render(vApp);
let $rootElement = mount($app, document.querySelector("#app")!);

setInterval(() => {
  count++;
  const vNewApp = createVApp({ count });
  const patch = diff(vApp, vNewApp);
  $rootElement = patch($rootElement);
  vApp = vNewApp;
}, 1000);
