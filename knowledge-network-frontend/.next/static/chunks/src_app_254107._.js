(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_254107._.js", {

"[project]/src/app/components/KnowledgeGraph.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/d3/src/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/d3/src/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
const KnowledgeGraph = ({ graphData })=>{
    _s();
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KnowledgeGraph.useEffect": ()=>{
            if (!graphData) return;
            const svg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.select(svgRef.current);
            svg.selectAll("*").remove(); // Clear previous graph
            const { nodes, links } = graphData;
            const width = 800;
            const height = 600;
            const simulation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forceSimulation(nodes).force("link", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forceLink(links).id({
                "KnowledgeGraph.useEffect.simulation": (d)=>d.id
            }["KnowledgeGraph.useEffect.simulation"]).distance(100)).force("charge", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forceManyBody().strength(-400)).force("center", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forceCenter(width / 2, height / 2));
            const link = svg.append("g").selectAll("line").data(links).enter().append("line").style("stroke", "gray").style("stroke-width", 2);
            const node = svg.append("g").selectAll("circle").data(nodes).enter().append("circle").attr("r", 10).style("fill", "skyblue").call(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.drag().on("start", {
                "KnowledgeGraph.useEffect.node": (event, d)=>{
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }
            }["KnowledgeGraph.useEffect.node"]).on("drag", {
                "KnowledgeGraph.useEffect.node": (event, d)=>{
                    d.fx = event.x;
                    d.fy = event.y;
                }
            }["KnowledgeGraph.useEffect.node"]).on("end", {
                "KnowledgeGraph.useEffect.node": (event, d)=>{
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }
            }["KnowledgeGraph.useEffect.node"]));
            const label = svg.append("g").selectAll("text").data(nodes).enter().append("text").attr("dx", 12).attr("dy", 4).text({
                "KnowledgeGraph.useEffect.label": (d)=>d.id
            }["KnowledgeGraph.useEffect.label"]);
            simulation.on("tick", {
                "KnowledgeGraph.useEffect": ()=>{
                    link.attr("x1", {
                        "KnowledgeGraph.useEffect": (d)=>d.source.x
                    }["KnowledgeGraph.useEffect"]).attr("y1", {
                        "KnowledgeGraph.useEffect": (d)=>d.source.y
                    }["KnowledgeGraph.useEffect"]).attr("x2", {
                        "KnowledgeGraph.useEffect": (d)=>d.target.x
                    }["KnowledgeGraph.useEffect"]).attr("y2", {
                        "KnowledgeGraph.useEffect": (d)=>d.target.y
                    }["KnowledgeGraph.useEffect"]);
                    node.attr("cx", {
                        "KnowledgeGraph.useEffect": (d)=>d.x
                    }["KnowledgeGraph.useEffect"]).attr("cy", {
                        "KnowledgeGraph.useEffect": (d)=>d.y
                    }["KnowledgeGraph.useEffect"]);
                    label.attr("x", {
                        "KnowledgeGraph.useEffect": (d)=>d.x
                    }["KnowledgeGraph.useEffect"]).attr("y", {
                        "KnowledgeGraph.useEffect": (d)=>d.y
                    }["KnowledgeGraph.useEffect"]);
                }
            }["KnowledgeGraph.useEffect"]);
        }
    }["KnowledgeGraph.useEffect"], [
        graphData
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: svgRef,
        width: 800,
        height: 600
    }, void 0, false, {
        fileName: "[project]/src/app/components/KnowledgeGraph.js",
        lineNumber: 85,
        columnNumber: 10
    }, this);
};
_s(KnowledgeGraph, "89Ty783ABEwsfMbSOeu9vscWF34=");
_c = KnowledgeGraph;
const __TURBOPACK__default__export__ = KnowledgeGraph;
var _c;
__turbopack_refresh__.register(_c, "KnowledgeGraph");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/graph/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$KnowledgeGraph$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/KnowledgeGraph.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
const GraphPage = ()=>{
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const data = searchParams.get("data") ? JSON.parse(decodeURIComponent(searchParams.get("data"))) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Generated Knowledge Network"
            }, void 0, false, {
                fileName: "[project]/src/app/graph/page.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            data ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$KnowledgeGraph$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                graphData: data
            }, void 0, false, {
                fileName: "[project]/src/app/graph/page.js",
                lineNumber: 14,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No graph data available. Please try again."
            }, void 0, false, {
                fileName: "[project]/src/app/graph/page.js",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/graph/page.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
};
_s(GraphPage, "a+DZx9DY26Zf8FVy1bxe3vp9l1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = GraphPage;
const __TURBOPACK__default__export__ = GraphPage;
var _c;
__turbopack_refresh__.register(_c, "GraphPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/graph/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_254107._.js.map