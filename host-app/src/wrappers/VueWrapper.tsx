import React, { useEffect, useRef } from "react";

const VueWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mountFn: any = null;
    let unmountFn: any = null;

    import("vueApp/App").then((mod) => {
      mountFn = mod.mount;
      unmountFn = mod.unmount;

      if (containerRef.current) {
        mountFn(containerRef.current);
      }
    });

    return () => {
      if (unmountFn) unmountFn();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default VueWrapper;
