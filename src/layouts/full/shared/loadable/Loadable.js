import React, { Suspense } from 'react';
import HashLoaderBackdrop from 'src/shared/HashLoaderBackdrop';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<HashLoaderBackdrop />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
