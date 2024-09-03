import { Node } from "./uniqueNodes";
export interface Edge {
    __typename?: unknown;
    node: Node;
    cursor: string;
}
export declare function createEdge(node: Node): Edge;
export declare function uniqueEdges(edges: Edge[]): Edge[];
