import { useState } from "react";

export const ListWithIndexKey = () => {
  const [items, setItems] = useState([
    {
      text: "Item A",
    },
    {
      text: "Item B",
    },
    {
      text: "Item C",
    },
  ]);

  const onClick = (index) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return items.map((item, index) => (
    <div key={index} className="mb-2 w-fit rounded border p-1">
      <label>
        Index {index} - {item.text}
        <input type="text" className="ml-2" />
      </label>
      <button
        className="ml-2 rounded bg-white p-1 text-black"
        onClick={() => onClick(index)}
      >
        Remove
      </button>
    </div>
  ));
};

export const ListWithId = () => {
  const [items, setItems] = useState([
    {
      id: "item-a",
      text: "Item A",
    },
    {
      id: "item-b",
      text: "Item B",
    },
    {
      id: "item-c",
      text: "Item C",
    },
  ]);

  const onClick = (index) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return items.map((item, index) => (
    <div key={item.id} className="mb-2 w-fit rounded border p-1">
      <label>
        Index {index} - {item.text}
        <input type="text" className="ml-2" />
      </label>
      <button
        className="ml-2 rounded bg-white p-1 text-black"
        onClick={() => onClick(index)}
      >
        Remove
      </button>
    </div>
  ));
};
