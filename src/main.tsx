import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Suspense fallback={<div>Loading...</div>}>
		<AuthProvider>
			<BrowserRouter>
				<StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
					<App />
				</StyleSheetManager>
			</BrowserRouter>
		</AuthProvider>
	</Suspense>
);