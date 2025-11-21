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
          colorPrimary: "var(--color-primary-600)",
          colorPrimaryHover: "var(--color-primary-500)",
          colorTextBase: "var(--color-foreground)",
          colorBgBase: "var(--color-surface)",
          colorBorder: "var(--color-border-strong)",
          borderRadius: 12,
          fontFamily: "var(--font-sans)",
        },
        components: {
          DatePicker: {
            borderRadius: 12,
            controlHeight: 48,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
