import React, { useRef } from 'react';
import {
    CellClickedEvent,
    ColDef,
    GetContextMenuItemsParams,
    GridApi,
    GridOptions,
    GridReadyEvent,
    MenuItemDef,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { ActionMenuRenderer } from './ActionMenuRenderer';
import { BuyRenderer } from './BuyRenderer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

export const App = () => {
    // use useRef instead of useState to avoid a stale closure
    // see https://stackoverflow.com/questions/64071586/
    const gridApiRef = useRef<GridApi>();

    const defaultColDef: ColDef = {
        resizable: false,
        sortable: true,
        filter: false,
        suppressMenu: true,
    };

    const columnDefs: Array<ColDef> = [
        {
            field: 'action',
            headerName: '',
            width: 36,
            suppressSizeToFit: true,
            cellRendererFramework: ActionMenuRenderer,
            cellStyle: { textAlign: 'center', padding: 0, cursor: 'pointer' },
        },
        { field: 'make' },
        { field: 'model' },
        { field: 'price', type: 'rightAligned' },
        {
            field: 'buy',
            headerName: '',
            width: 65,
            suppressSizeToFit: true,
            cellRendererFramework: BuyRenderer,
            cellStyle: { textAlign: 'center', padding: 0 },
        },
    ];

    const getContextMenuItems = (
        params: GetContextMenuItemsParams
    ): (string | MenuItemDef)[] => {
        const result: (string | MenuItemDef)[] = [
            {
                name: 'Buy ' + params.node.data.make,
                action: function () {
                    window.alert('Buying ' + params.node.data.make);
                },
            },
        ];

        return result;
    };

    const gridOptions: GridOptions = {
        domLayout: 'autoHeight',
        rowHeight: 46,
        suppressCellSelection: true,
        suppressContextMenu: true,
        getContextMenuItems: getContextMenuItems,
    };

    const rowData = [
        { make: 'Tesla', model: 'Model S', price: 90000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
    ];

    const handleGridReady = (event: GridReadyEvent) => {
        const { api: gridApi } = event;
        gridApiRef.current = gridApi;
        gridApi.sizeColumnsToFit();
    };

    const handleCellClicked = (event: CellClickedEvent) => {
        const { api: gridApi, colDef, node, column, value } = event;
        if (colDef.field === 'action') {
            // @ts-ignore
            gridApi.contextMenuFactory.showMenu(
                node,
                column,
                value,
                event.event
            );
        }
    };

    return (
        <main className="App">
            <div className="ag-theme-alpine example-grid">
                <AgGridReact
                    rowSelection="single"
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    gridOptions={gridOptions}
                    rowData={rowData}
                    onGridReady={handleGridReady}
                    onCellClicked={handleCellClicked}
                />
            </div>
        </main>
    );
};
