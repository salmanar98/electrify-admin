import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BesiAdminManagmentTableColDef } from '../utilities/helpers';
import BesiAdminManagementActionRenderer from './BesiAdminManagementActionRenderer';
import StatusRenderer from '../../shared/StatusRenderer';
import { debounce } from 'lodash';

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
  cellStyle: {
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const frameworkComponents = {
  BesiAdminManagementActionRenderer,
  StatusRenderer,
};

const BesiAdminManagementTable = ({ rows, setFilters, setSort, gridRef }) => {
  const handleFilterChanged = debounce((params) => {
    const filterCols = params?.api.getFilterModel();

    const newFilterModel = [];

    for (const colId in filterCols) {
      const colFilter = filterCols[colId];
      newFilterModel.push({ column_name: colId, type: 'like', value: colFilter.filter });
    }

    setFilters(newFilterModel);
  }, 300);

  const handleSort = (params) => {
    const columns = params?.columnApi.getColumnState();
    columns.forEach((column) => {
      if (column.sort) {
        setSort([
          {
            column_name: column.colId,
            order_by: column.sort,
          },
        ]);
      }
    });
  };

  return (
    <div className="ag-theme-alpine" style={{ margin: '10px 0' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rows}
        defaultColDef={defaultColDef}
        columnDefs={BesiAdminManagmentTableColDef}
        suppressScrollOnNewData={true}
        rowSelection="multiple"
        components={frameworkComponents}
        domLayout="autoHeight"
        onSortChanged={handleSort}
        onFilterChanged={handleFilterChanged}
      />
    </div>
  );
};

export default BesiAdminManagementTable;
