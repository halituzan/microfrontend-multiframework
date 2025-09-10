import React, { Suspense } from 'react';

const ReactApp = React.lazy(() => import('reactApp/App'));

const ReactWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div>React App yükleniyor...</div>}>
      <ReactApp />
    </Suspense>
  );
};

export default ReactWrapper;
