import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track
    visible = false;

    @track
    visibleTwo = false;

    handleClick = () => {
        this.visible = !this.visible;
    };

    handleTwoClick = () => {
        this.visibleTwo = !this.visibleTwo;
    };
}
