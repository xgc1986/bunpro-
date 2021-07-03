export class Component<T> {

    protected readonly props: T;

    constructor(props: T) {
        this.props = props;
    }

    public build(_: HTMLElement) {
    }

    public render() {}

    public setProps(props: T): void {
        // @ts-ignore
        this.props = props;

        this.render();
    }
}