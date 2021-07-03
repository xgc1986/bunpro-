import { DomObserver } from "src/DomObserver";
import { Component } from "src/Component";
import "./style.scss";
import { GrammarProgress } from "./BunPro/GrammarProgress";

DomObserver.init();

function link(query: string, component: Component<unknown>) {
    DomObserver.on(query, (element: HTMLElement): void => {
        component.build(element);
        component.render();
    });
}

link('#user-dashboard', new GrammarProgress);

