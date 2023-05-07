import React, { useState } from "react";
import Image from "next/image";

export const config = {
  runtime: "experimental-edge",
};

type CartItem = {
  product_id: number | null;
  price: number | null;
  quantity: number | null;
  size: string | null;
  weight: number | null;
  item_name: string | null;
  quantity_in_stock: number | null;
  quantity_in_checkouts: number | null;
  image: string | null;
};

export function Item({
  item,
  disableUpdates,
  onAdd,
  onRemove,
  onTextUpdate,
  onDelete,
}: {
  item: CartItem;
  disableUpdates: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onTextUpdate: (changeAmount: number, op: "+" | "-") => void;
  onDelete: () => void;
}) {
  const [quantity, setQuantity] = useState<number | string>(
    item.quantity as number
  );
  const [prevQuantity, setPrevQuantity] = useState(item.quantity as number);
  //const [addDisabled, setAddDisabled] = useState(false);
  //const [removeDisabled, setRemoveDisabled] = useState(false);
  //const [isReadOnly, setReadOnly] = useState(false);

  const images = (item.image as string).split(",");
  return (
    <>
      <div className="flex w-2/3 flex-row items-center justify-start gap-4">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <Image
            className="full object-cover"
            src={`/${(images[0] as string).trim()}`}
            alt="image"
            fill
          />
        </div>
        <div>
          <div className="pr-4 font-medium text-gray-100">{item.item_name}</div>
          {item.size !== "" && (
            <div className="text-gray-500">Size: {item.size}</div>
          )}
          <div className="text-gray-500">Price: ${item.price}</div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            setQuantity((quantity as number) - 1);
            setPrevQuantity((quantity as number) - 1);
            onRemove();
            //setRemoveDisabled(true);
            //setTimeout(() => setRemoveDisabled(false), 1000);
          }}
          disabled={(quantity as number) <= 1 || disableUpdates}
          type="submit"
          className="rounded-l-lg bg-gray-700 px-1 py-1 hover:bg-blue-500 active:bg-gray-900 disabled:bg-gray-400"
        >
          -
        </button>
        <input
          onChange={(e) => {
            setQuantity(
              e.target.value !== ""
                ? Math.min(
                    Math.max(parseInt(e.target.value), 1),
                    item.quantity_in_stock! -
                      (item.quantity_in_checkouts
                        ? item.quantity_in_checkouts
                        : 0)
                  )
                : ""
            );
          }}
          onBlur={() => {
            if (quantity === "") {
              setQuantity(prevQuantity);
            } else {
              if ((quantity as number) <= 0) {
                setQuantity(1);
              }
              if ((quantity as number) > prevQuantity) {
                onTextUpdate((quantity as number) - prevQuantity, "+");
              } else if ((quantity as number) < prevQuantity) {
                onTextUpdate(prevQuantity - (quantity as number), "-");
              }
              setPrevQuantity(quantity as number);
              //setReadOnly(true);
              //setTimeout(() => setReadOnly(false), 1000);
            }
          }}
          type="number"
          name="quantity"
          className="block w-[50px] rounded-none border border-gray-300 bg-gray-50 px-1 py-1 text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={quantity}
          max={
            item.quantity_in_stock! -
            (item.quantity_in_checkouts ? item.quantity_in_checkouts : 0)
          }
          min={1}
          readOnly={disableUpdates} //isReadOnly
        />
        <button
          onClick={() => {
            setQuantity((quantity as number) + 1);
            setPrevQuantity((quantity as number) + 1);
            onAdd();
            //setAddDisabled(true);
            //setTimeout(() => setAddDisabled(false), 1000);
          }}
          disabled={
            (quantity as number) >=
              item.quantity_in_stock! -
                (item.quantity_in_checkouts ? item.quantity_in_checkouts : 0) ||
            disableUpdates
          }
          type="submit"
          className="rounded-r-lg bg-gray-700 px-1 py-1 hover:bg-blue-500 active:bg-gray-900 disabled:bg-gray-400"
        >
          +
        </button>
      </div>
      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="text-right text-gray-100">
          <div>
            Total: ${item.price! * (quantity as number)}
            {item.price! % 1 === 0 ? ".00" : ""}
          </div>
        </div>
        <button
          onClick={() => onDelete()}
          disabled={disableUpdates}
          className="font-medium text-gray-500 hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Delete
        </button>
      </div>
    </>
  );
}
