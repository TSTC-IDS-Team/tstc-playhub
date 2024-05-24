import React from 'react';

const FileTree = ({ tree }) => {
    const renderTree = (node) => {
        if (typeof node === 'object') {
            return (
                <ul>
                    {Object.keys(node).map((key) => (
                        <li key={key} className={typeof node[key] === 'object' ? 'folder' : 'file'}>
                            {key}
                            {renderTree(node[key])}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return <div className="file-tree">{renderTree(tree)}</div>;
};

export default FileTree;
