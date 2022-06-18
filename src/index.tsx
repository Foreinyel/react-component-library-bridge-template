import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
const useCustomLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
const load = System.import("{{ resourceUrl }}");


{% for componentName in componentNames %}
  export const {{ componentName }} = (props:any) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useCustomLayoutEffect(() => {
    load.then((mod:any) => {
      ref.current = mod.{{ componentName }};
      setLoaded(true);
    });
  }, []);

  const Component = ref.current as unknown as React.FC;

  return loaded && Component ? <Component {...props} /> : null;
};
{% else %}
  export {}
{% endfor %}
