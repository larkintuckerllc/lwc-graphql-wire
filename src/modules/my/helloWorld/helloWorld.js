import { LightningElement, wire } from 'lwc';
import helloWorldWire from 'my/helloWorldWire';

export default class HelloWorld extends LightningElement {
    @wire(helloWorldWire, { world: 'World' })
    helloData = '';
}
