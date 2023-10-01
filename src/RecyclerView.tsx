import React from 'react';

interface Base {
    id?: string;
}

interface Props<T> {
    itemCount: number;
    items: (T & Base)[];
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T) => string;
}

function RecyclerView<T>({
                             itemCount,
                             items,
                             renderItem,
                             keyExtractor,
                         }: Props<T>) {
    return (
        <>
            {items.map((item, i) => (
                <div key={keyExtractor ? keyExtractor(item) : item.id}>
                    {renderItem(item, i)}
                </div>
            ))
            }
        </>
    );
}

export default RecyclerView;
