export class Component<T> {

    protected readonly props: T;

    constructor(props: T) {
        this.props = props;
    }

    public build(element: HTMLElement): void {
    }

    public render() {}

    public destroy() {}

    public setProps(props: T): void {
        // @ts-ignore
        this.props = props;

        this.render();
    }
}