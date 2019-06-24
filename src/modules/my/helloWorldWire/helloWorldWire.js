import { register, ValueChangedEvent } from '@lwc/wire-service';

const delay = () =>
    new Promise(resolve => {
        // eslint-disable-next-line
        setTimeout(() => {
            resolve();
        }, 3000);
    });

const helloWorldWire = () => {};

register(helloWorldWire, eventTarget => {
    let connected = false;
    let world = null;

    console.log('HELLO WORLD WIRE REGISTER');

    const handleConfig = config => {
        console.log('HELLO WORLD WIRE CONFIG');
        world = config.world;
    };

    const handleConnect = async () => {
        console.log('HELLO WORLD WIRE CONNECT');
        connected = true;
        await delay();
        if (!connected) return;
        console.log('HELLO WORLD WIRE DISPATCH EVENT');
        const event = new ValueChangedEvent(`Hello ${world}!`);
        eventTarget.dispatchEvent(event);
    };

    const handleDisconnect = async () => {
        console.log('HELLO WORLD WIRE DISCONNECT');
        connected = false;
        eventTarget.removeEventListener('disconnect', handleDisconnect);
        eventTarget.removeEventListener('connect', handleConnect);
        eventTarget.removeEventListener('config', handleConfig);
    };

    eventTarget.addEventListener('config', handleConfig);

    eventTarget.addEventListener('connect', handleConnect);

    eventTarget.addEventListener('disconnect', handleDisconnect);
});

export default helloWorldWire;
