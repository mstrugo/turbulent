import React, { memo, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { SplittedTextRow } from 'types';
import { arrayReorder } from 'utils';

interface ListProps {
  items: SplittedTextRow[];
  onChangeOrder: (items: any[]) => void;
}

export const DraggableList = memo(({ items, onChangeOrder }: ListProps) => {
  const [list, setList] = useState<SplittedTextRow[]>(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = arrayReorder(list, result.source.index, result.destination.index);

    setList(items);
    onChangeOrder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, _snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item.index} draggableId={String(item.index)} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? 'p-05 color--red' : 'p-05'}
                  >
                    {item.value}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});
