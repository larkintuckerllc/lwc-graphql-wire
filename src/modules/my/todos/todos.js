import { gql } from 'apollo-boost';
import { LightningElement, wire } from 'lwc';
import client from 'my/client';
import queryWire from 'my/queryWire';

export const ALL_TODOS_QUERY = gql`
    {
        allTodos {
            nodes {
                id
                nodeId
                title
            }
        }
    }
`;

export default class Todos extends LightningElement {
    @wire(queryWire, { client, query: ALL_TODOS_QUERY })
    todosResult;

    get error() {
        return this.todosResult.error;
    }

    get loading() {
        return this.todosResult.loading;
    }

    get todos() {
        return this.todosResult.data.allTodos.nodes;
    }
}
