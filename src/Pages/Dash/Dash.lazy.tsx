import React, { lazy, Suspense } from 'react';

const LazyCounter = lazy(() => import('./Dash'));

const Counter = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCounter />
  </Suspense>
);

export default Counter;
