import { gql } from 'apollo-boost';
import { LightningElement, track, wire } from 'lwc';
import client from 'my/client';
import mutationWire from 'my/mutationWire';
import { ALL_TODOS_QUERY } from 'my/todos';

const CREATE_TODO_MUTATION = gql`
    mutation createTodo($title: String!) {
        createTodo(input: { todo: { title: $title } }) {
            todo {
                id
                nodeId
                title
            }
        }
    }
`;

const handleMutationUpdate = (cache, { data }) => {
    if (data === undefined) {
        return;
    }
    const {
        createTodo: { todo }
    } = data;
    const cacheData = cache.readQuery({ query: ALL_TODOS_QUERY });
    const { allTodos } = cacheData;
    const newAllTodos = { ...allTodos };
    const { nodes: oldTodos } = newAllTodos;
    newAllTodos.nodes = [...oldTodos, todo];
    cache.writeQuery({
        data: { allTodos: newAllTodos },
        query: ALL_TODOS_QUERY
    });
};

export default class TodosCreate extends LightningElement {
    lastError = null;
    lastLoading = null;
    @track
    title = '';
    @wire(mutationWire, {
        client,
        mutation: CREATE_TODO_MUTATION,
        update: handleMutationUpdate
    })
    todosCreateResult;
    @track
    valid = false;

    get error() {
        return this.todosCreateResult.error;
    }

    get invalidOrLoading() {
        return !this.valid || this.todosCreateResult.loading;
    }

    get loading() {
        return this.todosCreateResult.loading;
    }

    get success() {
        return this.todosCreateResult.data !== null;
    }

    get todo() {
        return this.todosCreateResult.data.createTodo.todo;
    }

    handleInput = event => {
        this.title = event.target.value;
        const trimmedTitle = this.title.trim();
        this.valid = trimmedTitle !== '';
    };

    handleSubmit = event => {
        event.preventDefault();
        const variables = {
            title: this.title
        };
        this.todosCreateResult.mutate(variables);
    };

    renderedCallback() {
        if (
            this.lastLoading &&
            !this.todosCreateResult.loading &&
            !this.todosCreateResult.error
        ) {
            this.title = '';
            this.valid = false;
        }
        this.lastError = this.todosCreateResult.error;
        this.lastLoading = this.todosCreateResult.loading;
    }
}
