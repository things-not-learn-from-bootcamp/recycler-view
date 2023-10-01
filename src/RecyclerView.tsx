import React from 'react';

interface Props<T> {
    itemCount: number;
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

function RecyclerView<T>({
                             itemCount,
                             items,
                             renderItem,
                         }: Props<T>) {
    return (
        <>
            {items.map((item, i) => (
                <>
                    {renderItem(item, i)}
                </>
            ))
            }
        </>
    );
}

export default RecyclerView;
