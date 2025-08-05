"use client";

import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const siteId = 6484869;
const hotjarVersion = 6;

export default function HotjarComponent() {
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return null;
}
