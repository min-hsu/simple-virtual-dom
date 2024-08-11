import { createElement } from "./vdom/createElement";
import { render } from "./vdom/render";
import { mount } from "./vdom/mount";

const createVApp = ({ count }: Props) =>
  createElement("div", {
    attrs: { id: "app", dataCount: count },
    children: [
      String(count),
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/JgWZYoIgjzsIQO8joZ/giphy.gif",
        },
      }),
    ],
  });

const $app = render(createVApp({ count: 1 }));
mount($app, document.querySelector("#app")!);

console.log($app);
