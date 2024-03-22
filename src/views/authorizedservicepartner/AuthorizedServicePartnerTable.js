import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ActionRenderer from './AuthorizedServicePartnerActionRenderer';
import StatusRenderer from '../../shared/StatusRenderer';
import { AuthorizedServicePartnerColumnDefs } from '../utilities/helpers';
import { debounce } from 'lodash';

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
  wrapText: true,
  autoHeight: true,
  cellStyle: { display: 'flex', alignItems: 'center', fontFamily: 'Poppins, sans-serif' },
};
const frameworkComponents = {
  ActionRenderer,
  StatusRenderer,
};

const AuthorizedServicePartnerTable = ({ rows, setFilter, setSort, gridRef }) => {
  const handleFilterChanged = debounce((params) => {
    const filterCols = params?.api.getFilterModel();

    const newFilterModel = [];

    for (const colId in filterCols) {
      const colFilter = filterCols[colId];
      newFilterModel.push({ column_name: colId, type: 'like', value: colFilter.filter });
    }

    setFilter(newFilterModel);
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
        columnDefs={AuthorizedServicePartnerColumnDefs}
        suppressScrollOnNewData={true}
        rowSelection="single"
        components={frameworkComponents}
        domLayout="autoHeight"
        onFilterChanged={handleFilterChanged}
        onSortChanged={handleSort}
      />
    </div>
  );
};

export default AuthorizedServicePartnerTable;
