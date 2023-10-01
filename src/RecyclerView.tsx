import React from 'react';
import {FixedSizeList as List} from 'react-window';

interface Base {
    id?: string | number;
}

interface Props<T> {
    itemCount: number;
    itemSize: number;
    items: (T & Base)[];
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor?: (item: T) => string;
    initialNumToRender?: number;
}

function RecyclerView<T>({
                             itemCount,
                             items,
                             renderItem,
                             keyExtractor,
                             initialNumToRender,
                             itemSize,
                         }: Props<T>) {
    return (
        <List
            height={itemSize * ((initialNumToRender || itemCount) - 1)}
            overscanCount={0}
            itemCount={itemCount}
            itemSize={itemSize}
            width='100%'
        >
            {({index, style}) => {
                const item = items[index];
                return (
                    <div style={style} key={keyExtractor ? keyExtractor(item) : item.id}>
                        {renderItem(item, index)}
                    </div>
                );
            }}
        </List>
    );
}

export default RecyclerView;
