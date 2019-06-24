import { LightningElement, wire } from 'lwc';
import helloWorldWire from 'my/helloWorldWire';

export default class HelloWorld extends LightningElement {
    @wire(helloWorldWire, { world: 'World' })
    helloData = '';

    constructor() {
        super();
        console.log('CONSTRUCTED');
    }

    renderedCallback() {
        console.log('RENDERED');
    }

    connectedCallback() {
        console.log('CONNECTED');
    }

    disconnectedCallback() {
        console.log('DISCONNECTED');
    }
}
