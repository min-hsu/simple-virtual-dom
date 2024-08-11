import { createElement } from "./vdom/createElement";
import { render } from "./vdom/render";
import { mount } from "./vdom/mount";

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

const $app = render(createVApp({ count }));
let $rootElement = mount($app, document.querySelector("#app")!);

setInterval(() => {
  count++;
  const $app = render(createVApp({ count }));
  $rootElement = mount($app, $rootElement);
}, 1000);
