"use client";

import { ConfigProvider } from "antd";
import { ReactNode } from "react";

interface AntdProviderProps {
  children: ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#681155",
          colorPrimaryHover: "#FF5EC3",
          borderRadius: 16,
          fontFamily: "var(--font-sans)",
        },
        components: {
          DatePicker: {
            borderRadius: 16,
            controlHeight: 48,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
