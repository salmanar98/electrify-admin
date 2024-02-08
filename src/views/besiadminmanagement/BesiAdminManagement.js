import { Typography, Box, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BesiAdminManagementTable from './BesiAdminManagementTable';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Pagination from 'src/shared/Pagination';
import { useEffect, useRef, useState } from 'react';
import { ListAdmins } from 'src/ApiCalls/AdminApiCalls';
import ClearFilterButton from 'src/shared/ClearFilterButton';

const BesiAdminManagement = () => {
  const gridRef = useRef();
  const [params, setParams] = useState({
    page: 1,
    pageSize: 50,
  });
  const [sort, setSort] = useState([]);
  const [filterModel, setFilterModel] = useState([]);

  const handleChange = (key, value) => {
    if (key !== 'pageSize') setParams({ ...params, [key]: value });
    else
      setParams({
        page: 1,
        pageSize: value,
      });
  };
  const [adminsData, setAdminsData] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await ListAdmins({
        page: params.page,
        page_size: params.pageSize,
        filters: filterModel,
        sort: sort,
      });
      setAdminsData(result);
    })();
  }, [params, filterModel, sort]);

  return (
    <PageContainer title="BESI Admins" description="this is admins listing page">
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'end' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h3">BESI Admin</Typography>
        </Box>
        <Box component="div">
          <Button
            size="medium"
            component={Link}
            to="/admin-management/add-admin"
            color="primary"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add Admin
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <ClearFilterButton filterModel={filterModel} gridRef={gridRef} />
      </Box>
      <Box sx={{ mt: 6 }}>
        <BesiAdminManagementTable
          rows={adminsData?.data ?? []}
          filterModel={filterModel}
          setSort={setSort}
          setFilters={setFilterModel}
          gridRef={gridRef}
        />
        {adminsData?.data ? (
          <Pagination
            currentPage={adminsData?.currentPage}
            totalPages={adminsData?.totalPages}
            pageSize={adminsData?.pageSize}
            handleChange={handleChange}
          />
        ) : null}
      </Box>
    </PageContainer>
  );
};

export default BesiAdminManagement;
