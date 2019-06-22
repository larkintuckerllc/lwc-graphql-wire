import { LightningElement, wire } from 'lwc';
import helloWorldWire from 'my/helloWorldWire';

export default class HelloWorldTwo extends LightningElement {
    @wire(helloWorldWire, { world: 'World Two' })
    helloData = '';
}
