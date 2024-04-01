import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import AuthorizedServicePartnerTable from './AuthorizedServicePartnerTable';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ListPartners } from 'src/ApiCalls/AuthorizedServicePartnerApiCalls';
import Pagination from 'src/shared/Pagination';
import ClearFilterButton from 'src/shared/ClearFilterButton';
const AuthorizedServicePartner = () => {
  const gridRef = useRef();
  const [ServicePartnerData, setServicePartnerData] = useState(null);
  const [filterModel, setFilterModel] = useState([]);
  const [sort, setSort] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 50,
  });

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
      let result = await ListPartners({
        page: params.page,
        page_size: params.pageSize,
        filters: filterModel,
        sort: sort,
      });
      setServicePartnerData(result);
    })();
  }, [params, filterModel, sort]);
  return (
    <PageContainer
      title="Authorized Service Partner"
      description="this is Authorized Service Partner"
    >
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'end' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h3">Authorized Service Partner</Typography>
        </Box>
        <Box component="div">
          <Button
            size="medium"
            sx={{ marginRight: 1 }}
            color="primary"
            component={Link}
            variant="contained"
            to="/service-partner/bulk-upload"
            startIcon={<AddOutlinedIcon />}
          >
            Bulk Upload
          </Button>
          <Button
            size="medium"
            component={Link}
            to="/service-partner/add-service-partner"
            color="primary"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add Partner
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <ClearFilterButton filterModel={filterModel} gridRef={gridRef} />
      </Box>
      <Box sx={{ mt: 6 }}>
        <AuthorizedServicePartnerTable
          rows={ServicePartnerData?.data ?? []}
          setFilter={setFilterModel}
          setSort={setSort}
          gridRef={gridRef}
        />
        {ServicePartnerData?.data ? (
          <Pagination
            currentPage={ServicePartnerData?.currentPage}
            totalPages={ServicePartnerData?.totalPages}
            pageSize={ServicePartnerData?.pageSize}
            handleChange={handleChange}
          />
        ) : null}
      </Box>
    </PageContainer>
  );
};

export default AuthorizedServicePartner;
