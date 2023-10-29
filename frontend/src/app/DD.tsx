import React, { useState } from 'react';

const DragAndDrop: React.FC = () => {
  const [items, setItems] = useState([' ']);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    e.dataTransfer.setData('text/plain', item);
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: string) => {
    e.preventDefault();
    if (draggedItem) {
      const newItems = items.slice();
      const sourceIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.indexOf(targetItem);

      newItems[sourceIndex] = targetItem;
      newItems[targetIndex] = draggedItem;

      setItems(newItems);
      setDraggedItem(null);
    }
  };

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <div
          
          key={item}
          className="bg-gray-200 p-7 m-5 cursor-pointer px-7"
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item)}
        >
          {item}upload your document here
        </div>
      ))} {/* Remove the extra comma here */}
    </div>
  );
};

export default DragAndDrop;
