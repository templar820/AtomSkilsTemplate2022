import React, { useState } from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SvgIcons,
  Typography,
} from 'ui-kit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Colors from '@colors';
import './style.scss';

type ItemMoveEventArgs = {
  destination: {
    index: number;
  };
  source: {
    index: number;
  };
};

export type IDraggableListItem = {
  id: string;
  name: string;
  description: string;
};

interface DraggableList {
  noItemsMessage: string;
  items: IDraggableListItem[];
  readonly?: boolean;
  onItemRemove?: (itemId: string) => void;
  onItemMove?: (e: ItemMoveEventArgs) => void;
}

enum DragDirection {
  up = 'direction-up',
  down = 'direction-down',
}

const DraggableList: React.FC<DraggableList> = ({
  noItemsMessage,
  items,
  readonly,
  onItemRemove,
  onItemMove,
}) => {
  const [targetIndex, setTargetIndex] = useState();
  const [dragDirection, setDragDirection] = useState<DragDirection>();

  function handleDragUpdate(e) {
    const destIndex =
      e.destination.index !== e.source.index ? e.destination.index : e.destination.index - 1;
    setTargetIndex(destIndex);
    setDragDirection(e.destination.index < e.source.index ? DragDirection.up : DragDirection.down);
  }

  function handleDragEnd(e) {
    setTargetIndex(null);
    onItemMove && onItemMove(e);
  }

  return (
    <div>
      {!items.length && (
        <Typography component="p" variant="body2" color="gray6">
          {noItemsMessage}
        </Typography>
      )}

      <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
        <Droppable droppableId="draggable-list">
          {(provided) => (
            <List className="draggable-list" {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, i) => (
                <Draggable key={item.id} draggableId={item.id} index={i} isDragDisabled={readonly}>
                  {(provided, snapshot) => (
                    <ListItem
                      className={`
                      draggable-list__item 
                      draggable-list-item 
                      ${snapshot.isDragging ? 'draggable-list__item_dragging' : ''}
                      ${i === targetIndex ? 'draggable-list__item_draggedOver' : ''}
                      ${dragDirection}
                      `}
                      disableGutters
                      alignItems="flex-start"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {!readonly && (
                        <ListItemIcon className="draggable-list-item__icon">
                          <SvgIcons
                            name="draggable"
                            color={snapshot.isDragging ? Colors.gray6 : Colors.gray4}
                            className="draggable"
                            width="16"
                            height="16"
                          />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        className="textNode"
                        primary={item.name}
                        secondary={item.description}
                      />
                      {!readonly && (
                        <IconButton
                          className="draggable-list-item__delete-icon"
                          edge="end"
                          aria-label="delete"
                          onClick={() => onItemRemove && onItemRemove(item.id)}
                        >
                          <SvgIcons name="delete" color={Colors.gray6} />
                        </IconButton>
                      )}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableList;
