// fileUtils.js
export const generateTree = (files) => {
    const tree = {};

    files.forEach(({ file, relativePath }) => {
        const parts = relativePath.split('/');
        let current = tree;

        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                current[part] = file;
            } else {
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        });
    });

    return tree;
};
