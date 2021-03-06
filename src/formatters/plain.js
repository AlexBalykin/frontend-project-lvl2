const stringify = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const getPath = (node, path) => [...path, node.key].join('.');

const mapping = {
  children: (node, path, iter) => iter(node.ast, [...path, node.key]),
  added: (node, path) => `Property '${getPath(node, path)}' was added with value: ${stringify(node.value)}`,
  removed: (node, path) => `Property '${getPath(node, path)}' was removed`,
  changed: (node, path) => `Property '${getPath(node, path)}' was updated. From ${stringify(node.oldValue)
  } to ${stringify(node.newValue)}`,
  unchanged: () => [],
};

export default (tree) => {
  const iter = (node, path) => node.flatMap((item) => mapping[item.status](item, path, iter));
  return iter(tree, []).join('\n');
};
