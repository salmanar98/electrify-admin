export const LoginSliders = [
  {
    image: '/images/auth/joinus.png',
    name: 'Access Your Account',
    description: 'Sign in securely to access your personalized account features.',
  },
  {
    image: '/images/auth/connectwithanydevice.png',
    name: 'Access with any device.',
    description: 'Everything you need is an internet connection.',
  },
];
export const ForgetSliders = [
  {
    image: '/images/auth/fogetpasswor.png',
    name: 'Password Recovery',
    description: 'Initiate the password recovery process to regain access to your account.',
  },
];
export const OtpSliders = [
  {
    image: '/images/auth/otp.png',
    name: 'Verify with OTP',
    description:
      'Confirm your identity with a one-time password to securely reset your account password.',
  },
];
export const ChangePasswordSliders = [
  {
    image: '/images/auth/change-pass.png',
    name: 'Update Your Password',
    description:
      'Keep your account secure by updating your password regularly with this simple process.',
  },
];

export const BesiAdminManagmentTableColDef = [
  {
    headerName: 'ID',
    field: 'id',
    minWidth: 80,
    maxWidth: 80,
  },
  {
    headerName: 'First Name',
    field: 'first_name',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Last Name',
    field: 'last_name',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Email Address',
    field: 'email',
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Access Level',
    field: 'type',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  { headerName: 'Status', field: 'is_active', cellRenderer: 'StatusRenderer', minWidth: 150 },
  {
    headerName: 'Actions',
    cellRenderer: 'BesiAdminManagementActionRenderer',
    minWidth: 150,
    sortable: false,
  },
];

export const AuthorizedServicePartnerColumnDefs = [
  {
    headerName: 'Company Name',
    field: 'company_name',
    minWidth: 250,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Company Phone No',
    field: 'phone_number',
    minWidth: 250,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Company Email',
    field: 'email',
    minWidth: 250,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  { headerName: 'Country', field: 'country', sortable: false },
  { headerName: 'State', field: 'state', sortable: false },
  { headerName: 'City', field: 'city', sortable: false },
  {
    headerName: 'Status',
    field: 'is_active',
    cellRenderer: 'StatusRenderer',
    minWidth: 150,
  },
  {
    headerName: 'Action',
    field: 'action',
    cellRenderer: 'ActionRenderer',
    minWidth: 150,
    sortable: false,
  },
];
export const AuthorizedServicePartnerColumnDefs1 = [
  { headerName: 'Company Name', field: 'company_name' },
  { headerName: 'Company Phone No', field: 'phone_number' },
  { headerName: 'Company Email', field: 'email' },
  { headerName: 'Country', field: 'country' },
  { headerName: 'State', field: 'state' },
  { headerName: 'Address', field: 'address' },
  { headerName: 'Street', field: 'street' },
  { headerName: 'Postal Code', field: 'postal_code' },
  { headerName: 'City', field: 'city' },
  { headerName: 'Status', field: 'is_active', cellRenderer: 'StatusRenderer' },
  { headerName: 'Action', field: 'action', cellRenderer: 'ActionButtons' },
];

export const DeviceManagementTableColDef = [
  {
    headerName: 'Serial number',
    field: 'serialNumber',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    colId: 'serial_number',
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Service Partner',
    field: 'servicePartnerName',
    sortable: false,
    minWidth: 200,
  },

  {
    headerName: 'Model Number',
    field: 'modelNumber',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    colId: 'model_number',
    floatingFilterComponentParams: { suppressFilterButton: true },
  },
  {
    headerName: 'Mac Address',
    field: 'MACAddress',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    colId: 'mac_address',
    floatingFilterComponentParams: { suppressFilterButton: true },
  },

  {
    headerName: 'First Name',
    field: 'firstName',
    sortable: false,
    minWidth: 150,
  },
  {
    headerName: 'Last Name',
    field: 'lastName',
    sortable: false,
    minWidth: 150,
  },

  {
    headerName: 'Device Name',
    field: 'deviceName',
    minWidth: 200,
    sortable: false,
  },

  {
    headerName: 'System Status',
    field: 'systemStatus',
    minWidth: 200,
    sortable: false,
  },
  {
    headerName: 'Battery Capacity',
    field: 'batteryCapacity',
    minWidth: 200,
    sortable: false,
  },

  {
    headerName: 'Wifi Module Address',
    field: 'wifiModuleAddress',
    minWidth: 200,
    sortable: false,
  },

  {
    headerName: 'Activation Date',
    field: 'activationDate',
    minWidth: 200,
    sortable: false,
  },
  {
    headerName: 'Upload Date',
    field: 'uploadDate',
    minWidth: 200,
    sortable: false,
  },

  {
    headerName: 'Actions',
    cellRenderer: 'DeviceManagementActionRenderer',
    minWidth: 150,
    sortable: false,
  },
];
export const DeviceManagementTableColDef1 = [
  {
    headerName: 'Model Number',
    field: 'model_number',
    minWidth: 150,
  },
  {
    headerName: 'Serial Number',
    field: 'serial_number',
    minWidth: 150,
  },

  {
    headerName: 'Mac address',
    field: 'mac_address',
    minWidth: 300,
  },

  {
    headerName: 'service Partner email',
    field: 'service_partners_email',
    minWidth: 300,
  },
  {
    headerName: 'Actions',
    cellRenderer: 'ActionButtons',
    minWidth: 300,
  },
];
export const ViewSystemtableColDef = [
  {
    headerName: 'Input Voltage',
    field: 'upsInputVoltage',
    minWidth: 120,
  },
  {
    headerName: 'Input Fault Voltage',
    field: 'inputFaultVoltage',
    minWidth: 120,
  },
  {
    headerName: 'Output Voltage',
    field: 'outputVoltage',
    minWidth: 120,
  },
  {
    headerName: 'Output Current',
    field: 'outputCurrent',
    minWidth: 120,
  },
  {
    headerName: 'Output Frequency',
    field: 'outputFrequency',
    minWidth: 120,
  },
  {
    headerName: 'Battery Voltage',
    field: 'batteryVoltage',
    minWidth: 120,
  },
  {
    headerName: 'Temperature',
    field: 'temperature',
    minWidth: 120,
  },
  {
    headerName: 'Utility Fail',
    field: 'utilityFail',
    minWidth: 120,
  },
  {
    headerName: 'Battery Low',
    field: 'batteryLow',
    minWidth: 120,
  },
  {
    headerName: 'UPS Failed',
    field: 'upsFailed',
    minWidth: 120,
  },
  // {
  //   headerName: 'UPS Normal',
  //   field: 'upsNormal',
  //   minWidth: 100,
  // },
  // {
  //   headerName: 'UPS Fanlock',
  //   field: 'upsFanlocak',
  //   minWidth: 100,
  // },
  // {
  //   headerName: 'UPS Overload',
  //   field: 'upsOverload',
  //   minWidth: 130,
  // },
  // {
  //   headerName: 'UPS Short Circuit ',
  //   field: 'upsShortCircuit',
  //   minWidth: 100,
  // },
  // {
  //   headerName: 'UPS Bad Battery ',
  //   field: 'upsBadBattery',
  //   minWidth: 100,
  // },
  // {
  //   headerName: 'Inverter Charging',
  //   field: 'inverterCharging',
  //   minWidth: 130,
  // },
  // {
  //   headerName: 'Inverter Not Charging',
  //   field: 'inverterNotCharging',
  //   minWidth: 130,
  // },
  {
    headerName: 'Date',
    field: 'uploadDate',
    minWidth: 300,
  },
];
