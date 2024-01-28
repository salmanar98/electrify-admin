import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ViewSystemtableColDef } from '../utilities/helpers';
import { Button, Typography, Box, Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BackButton from 'src/shared/BackButton';
import PageContainer from 'src/components/container/PageContainer';
import { useParams } from 'react-router';
import { viewSystem } from 'src/ApiCalls/SystemMangementApiCalls';
import Pagination from 'src/shared/Pagination';
import { styled } from '@mui/material';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
  wrapText: true,
  autoHeight: true,
  cellStyle: { display: 'flex', alignItems: 'center', fontFamily: 'Poppins, sans-serif' },
  wrapHeaderText: true,
  autoHeaderHeight: true,
};

const SystemManagmentDetails = () => {
  const [systemData, setSystemData] = useState();
  const [focusedInput, setFocusedInput] = useState(null);
  const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });

  const { id: systemID } = useParams();
  const [params, setParams] = useState({
    page: 1,
    pageSize: 50,
  });
  const [type, setType] = useState('FILTER');

  const handleChange = (key, value) => {
    if (key !== 'pageSize') setParams({ ...params, [key]: value });
    else
      setParams({
        page: 1,
        pageSize: value,
      });
  };
  useEffect(() => {
    (async () => {
      const response = await viewSystem({
        page: params.page,
        page_size: params.pageSize,
        systemID,
        type,
        dateFilter,
      });

      if (response) {
        setType('FILTER');
        if (type === 'FILTER') setSystemData(response);
      }
    })();
  }, [systemID, type, params, dateFilter]);

  return (
    <PageContainer title="Devices" description="this is syestem view page">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          component="div"
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
          alignItems={{ xs: 'start', sm: 'center' }}
        >
          <Box component="div" mb={{ xs: 2, sm: 0 }}>
            <Typography variant="h3">
              {' '}
              <BackButton /> System Statistics
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'block' } }} />
            <Grid item xs={12} md={6}>
              <StyledBox>
                <Typography variant="caption" display="block" gutterBottom>
                  Filter by Date
                </Typography>
                <DateRangePicker
                  startDateId="your_unique_start_date_id"
                  endDateId="your_unique_end_date_id"
                  startDate={dateFilter?.startDate}
                  endDate={dateFilter?.endDate}
                  onDatesChange={({ startDate, endDate }) => {
                    setDateFilter({ startDate, endDate });
                  }}
                  focusedInput={focusedInput}
                  onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                  hideKeyboardShortcutsPanel
                  isOutsideRange={() => false}
                  displayFormat="DD-MMM-YYYY"
                  small
                  customArrowIcon={<span>—</span>}
                />
              </StyledBox>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ArrowDownwardIcon />}
                sx={{ mr: 2 }}
                onClick={() => setType('EXPORT')}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <div className="ag-theme-alpine" style={{ margin: '10px 0' }}>
          <AgGridReact
            rowData={systemData?.data}
            defaultColDef={defaultColDef}
            columnDefs={ViewSystemtableColDef}
            //suppressScrollOnNewData={true}
            domLayout="autoHeight"
          />
        </div>
        {systemData?.data ? (
          <Pagination
            currentPage={systemData?.currentPage}
            totalPages={systemData?.totalPages}
            pageSize={systemData?.pageSize}
            handleChange={handleChange}
          />
        ) : null}
      </Box>
    </PageContainer>
  );
};

export default SystemManagmentDetails;
const StyledBox = styled(Grid)(({ theme }) => ({
  position: 'relative',
  '& .MuiTypography-root': {
    position: 'absolute',
    left: '10px',
    top: '-12px',
    fontSize: '10px',
    color: '#00000099',
    paddingLeft: '4px',
    paddingRight: '4px',
    zIndex: '100',
  },
  '& .DateRangePicker': {
    width: '100%',
    '& .DateRangePickerInput': {
      width: '100%',
      background: '#ffffff',
      border: ' 1px double #c0c0c0',
      borderRadius: '4px',
      '& .DateInput': {
        background: 'unset',
        width: '48%',
        '& .DateInput_input': {
          background: 'unset',
          font: 'unset',
          textAlign: 'center',
          padding: '14px 4px',
        },
        '& .DateInput_input__focused': {
          borderBottom: '2px solid',
          borderBottomColor: theme.palette.primary.main,
        },
      },
      '& .DateRangePicker_picker': {
        '& .DayPicker': {
          '& .DayPicker_focusRegion': {
            '& .DayPicker_transitionContainer': {
              '& .CalendarMonthGrid': {
                '& .CalendarMonth': {
                  '& .CalendarMonth_table': {
                    '& .CalendarDay__hovered_span': {
                      background: theme.palette.primary.light,
                      color: 'white',
                    },
                    '& .CalendarDay__selected_start': {
                      background: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    },
                    '& .CalendarDay__selected_span': {
                      background: theme.palette.primary.light,
                      borderColor: theme.palette.primary.light,
                    },
                    '& .CalendarDay__selected_end': {
                      background: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}));
