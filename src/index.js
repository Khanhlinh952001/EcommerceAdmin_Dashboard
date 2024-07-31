import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences theme={windmillTheme}>
      <NotificationContainer/>

        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById("root")
);
