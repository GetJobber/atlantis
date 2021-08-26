import { Node } from "./uniqueNodes";

export interface Edge {
  __typename?: unknown;
  node: Node;
  cursor: string;
}

export function createEdge(node: Node): Edge {
  return {
    node: node,
    cursor: "",
    __typename: `${node.__typename}Edge`,
  };
}

export function uniqueEdges(edges: Edge[]): Edge[] {
  const result = new Map<string, Edge>();
  edges.forEach(edge => {
    result.set(
      `${edge.__typename}-${edge.node.__typename}-${edge.node.id}`,
      edge,
    );
  });
  return Array.from(result.values());
}
