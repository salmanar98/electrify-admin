import React, { useEffect, useRef, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SystemManagementTable from './SystemManagementTable';
import { ListSystems } from 'src/ApiCalls/SystemMangementApiCalls';
import Pagination from 'src/shared/Pagination';
import ClearFilterButton from 'src/shared/ClearFilterButton';
const SystemManagement = () => {
  const gridRef = useRef();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 50,
  });
  const [filterModel, setFilterModel] = useState([]);
  const [sort, setSort] = useState([]);

  const handleChange = (key, value) => {
    if (key !== 'pageSize') setParams({ ...params, [key]: value });
    else
      setParams({
        page: 1,
        pageSize: value,
      });
  };
  const [systemManagementData, setSystemManagementData] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await ListSystems({
        page: params.page,
        page_size: params.pageSize,
        filters: filterModel,
        sort: sort,
      });

      setSystemManagementData(result);
    })();
  }, [params, filterModel, sort]);

  return (
    <PageContainer title="System" description="this is Device listing page">
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'end' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h3"> System</Typography>
        </Box>
        <Box component="div">
          <Button
            size="medium"
            sx={{ marginRight: 1 }}
            color="primary"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            to="/system-managment/bulk-upload"
            component={Link}
          >
            Bulk Upload
          </Button>
          <Button
            size="medium"
            component={Link}
            to="/system-managment/add-system"
            color="primary"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add System
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <ClearFilterButton filterModel={filterModel} gridRef={gridRef} />
      </Box>
      <Box sx={{ mt: 6 }}>
        <SystemManagementTable
          rows={systemManagementData?.data ?? []}
          setFilters={setFilterModel}
          setSort={setSort}
          gridRef={gridRef}
        />
        {systemManagementData?.data ? (
          <Pagination
            currentPage={systemManagementData?.currentPage}
            totalPages={systemManagementData?.totalPages}
            pageSize={systemManagementData?.pageSize}
            handleChange={handleChange}
          />
        ) : null}
      </Box>
    </PageContainer>
  );
};

export default SystemManagement;
