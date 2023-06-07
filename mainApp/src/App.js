import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './App.css';
// 引入 app2 模块作为组件
import RemoteApp from 'app2/APP2';
function App() {
    const [count, setCount] = useState(0);
    return (_jsx("div", { className: "App", children: _jsxs("header", { className: "App-header", children: [_jsx("p", { children: "Hello App1! This is Vite + React!" }), _jsx(RemoteApp, {}), _jsx("p", { children: _jsxs("button", { type: "button", onClick: () => setCount((count) => count + 1), children: ["count is: ", count] }) }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "App.tsx" }), " and save to test HMR updates."] }), _jsxs("p", { children: [_jsx("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer", children: "Learn React" }), ' | ', _jsx("a", { className: "App-link", href: "https://vitejs.dev/guide/features.html", target: "_blank", rel: "noopener noreferrer", children: "Vite Docs" })] })] }) }));
}
export default App;
