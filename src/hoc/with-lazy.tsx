import { ComponentType, Suspense, lazy } from "react";

function withLazy<T extends object>(
  lazyImport: () => Promise<{ default: ComponentType<T> }>,
) {
  const LazyComponent = lazy(lazyImport) as unknown as ComponentType<T>;

  return (props: T) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withLazy;
