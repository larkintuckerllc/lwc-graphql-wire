import { register, ValueChangedEvent } from '@lwc/wire-service';

const queryWire = () => {};

register(queryWire, eventTarget => {
    let client = null;
    let data = null;
    let connected = false;
    let error = false;
    let loading = true;
    let query = null;
    let subscription = null;

    const sendResult = () => {
        if (!connected) return;
        const result = {
            data,
            error,
            loading
        };
        const event = new ValueChangedEvent(result);
        eventTarget.dispatchEvent(event);
    };

    const observableNextCallback = result => {
        loading = false;
        data = result.data;
        sendResult();
    };

    const observableErrorCallback = err => {
        if (!err) return;
        loading = false;
        error = true;
        sendResult();
    };

    const observableCompleteCallback = () => {
        // PLACEHOLDER
    };

    const handleConfig = config => {
        connected = true;
        client = config.client;
        query = config.query;
        sendResult();
    };

    const handleConnect = async () => {
        const queryOptions = {
            query
        };
        const observable = client.watchQuery(queryOptions);
        subscription = observable.subscribe(
            observableNextCallback,
            observableErrorCallback,
            observableCompleteCallback
        );
        try {
            await client.query(queryOptions);
        } catch (err) {
            // PLACEHOLDER
        }
    };

    const handleDisconnect = async () => {
        connected = false;
        subscription.unsubscribe();
        eventTarget.removeEventListener('disconnect', handleDisconnect);
        eventTarget.removeEventListener('connect', handleConnect);
        eventTarget.removeEventListener('config', handleConfig);
    };

    eventTarget.addEventListener('config', handleConfig);

    eventTarget.addEventListener('connect', handleConnect);

    eventTarget.addEventListener('disconnect', handleDisconnect);
});

export default queryWire;
