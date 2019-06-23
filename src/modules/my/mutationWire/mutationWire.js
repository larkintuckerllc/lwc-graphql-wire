import { register, ValueChangedEvent } from '@lwc/wire-service';

const mutationWire = () => {};

register(mutationWire, eventTarget => {
    let client = null;
    let connected = false;
    let data = null;
    let error = false;
    let loading = false;
    let mutate = null;
    let mutation = null;
    let update = null;

    const sendResult = () => {
        if (!connected) return;
        const result = {
            data,
            error,
            loading,
            mutate
        };
        const event = new ValueChangedEvent(result);
        eventTarget.dispatchEvent(event);
    };

    const handleConfig = config => {
        connected = true;
        client = config.client;
        mutation = config.mutation;
        update = config.update;
        mutate = async variables => {
            data = null;
            error = false;
            loading = true;
            sendResult();
            const mutationOptions = {
                mutation,
                update,
                variables
            };
            try {
                const result = await client.mutate(mutationOptions);
                data = result.data;
            } catch (err) {
                error = true;
            }
            loading = false;
            sendResult();
        };
        sendResult();
    };

    const handleConnect = async () => {
        // PLACEHOLDER
    };

    const handleDisconnect = async () => {
        connected = false;
        eventTarget.removeEventListener('disconnect', handleDisconnect);
        eventTarget.removeEventListener('connect', handleConnect);
        eventTarget.removeEventListener('config', handleConfig);
    };

    eventTarget.addEventListener('config', handleConfig);

    eventTarget.addEventListener('connect', handleConnect);

    eventTarget.addEventListener('disconnect', handleDisconnect);
});

export default mutationWire;
