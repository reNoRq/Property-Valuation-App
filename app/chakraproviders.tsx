"use client";

// import { CacheProvider } from "@chakra-ui/next-js";
// import { ChakraProvider } from "@chakra-ui/react";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <CacheProvider>
//       <ChakraProvider>{children}</ChakraProvider>
//     </CacheProvider>
//   );
// }

import { Provider } from "@/components/ui/provider";
import { APIProvider } from "@vis.gl/react-google-maps";

// export const Providers = (props: { children: React.ReactNode }) => (
//   const {children} = props;
//   <Provider>
//     <Component />
//   </Provider>
// )

export default function ChakuraProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Provider>
      {" "}
      <APIProvider
        apiKey="AIzaSyBN2E7WJ1Nm-u4-RxC4ZDPjEoVA0pRhh_A"
        libraries={["places"]}
      >
        {children}
      </APIProvider>
    </Provider>
  );
}
