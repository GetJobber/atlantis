export interface Node {
  id: unknown;
  __typename?: unknown;
}

export function uniqueNodes(nodes: Node[]): Node[] {
  const result = new Map<string, Node>();
  nodes.forEach(node => {
    result.set(`${node.__typename}-${node.id}`, node);
  });
  return Array.from(result.values());
}
