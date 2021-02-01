import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export const BuyRenderer = ({ data }: ICellRendererParams) => {
    /**
     * Attach onClick handler to the real DOM element. This is to prevent
     * row selection when the buy button is clicked.
     * See details here:
     * https://stackoverflow.com/questions/63964553/ag-grid-prevent-onrowclicked-event-when-clicking-icon-inside-cell
     */
    const buttonRefCallback = (element: HTMLButtonElement) => {
        element.onclick = (e: any) => {
            e.stopPropagation();
            alert(
                `You are now the proud owner of a ${data.make} ${data.model}.`
            );
        };
    };

    return (
        <button
            ref={buttonRefCallback}
            className="btn btn-outline-secondary btn-sm"
        >
            BUY
        </button>
    );
};
