import { DomObserver } from "src/DomObserver";
import { Component } from "src/Component";
import { GrammarProgress } from "./BunPro/GrammarProgress";
import { Settings } from "./BunPro/Settings";
import "./style.scss";

DomObserver.init();

function link(query: string, component: new () => Component<unknown>) {

    let currentInstance: Component<unknown> = null;

    DomObserver.onLoad(query, (element: HTMLElement): void => {
        // @ts-ignore
        const comp = element._wppIntance;
        let instance: Component<unknown> | null = null;

        if (comp) {
            instance = comp;    
        } else {
            if (currentInstance) {
                currentInstance.destroy();
            }
            instance = new component();
            currentInstance = instance;
        }

        // @ts-ignore
        element._wppIntance = instance;
        instance.build(element);
        instance.render();
    });

    /*DomObserver.onUnload(query, (element: HTMLElement): void => {
        // @ts-ignore
        const comp = element._wppIntance;
        if (comp) {
            // @ts-ignore
            console.warn(`destroy ${element.kkk}`, element);
            comp.destroy();
            // @ts-ignore
            element._wppIntance = null;
        }
    });*/
}

link('#user-dashboard', GrammarProgress);
link('#settings-holder', Settings);
