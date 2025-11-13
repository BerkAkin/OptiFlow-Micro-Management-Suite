export const modulePaths = {
    "Financial Tracking and Invoicing": {
        color: "bg-indigo-400 hover:bg-indigo-500",
        parts: [

        ]
    },
    "Corporate Survey and Insight": {
        color: "bg-amber-500 hover:bg-amber-600",
        parts: [

        ]
    },
    "Corporate Suggestion and Innovation": {
        color: "bg-sky-600 hover:bg-sky-700",
        parts: [
            { url: "/suggest/suggestIdeas", module: "Ideas" },
            { url: "/suggest/suggestRewards", module: "Rewards" },
        ]
    },
    "Permission Tracking and Approval System": {
        color: "bg-rose-400 hover:bg-rose-500",
        parts: [
            { url: "/permission/permissionRequest", module: "Requests" },
            { url: "/permission/permissionList", module: "Approval" },
            { url: "/permission/permissionCalendar", module: "Calendar" },
            { url: "/permission/permissionHistory", module: "History" }
        ]
    },
    "Employee Support": {
        color: "bg-emerald-600 hover:bg-emerald-700",
        parts: [
            { url: "/support/supportReport", module: "Report" },
            { url: "/support/supportChat", module: "Support Chat" },
            { url: "/support/supportStats", module: "Stats" },
            { url: "/support/supportAwareness", module: "Awareness" }
        ]
    },
    "Appreciation System": {
        color: "bg-slate-400 hover:bg-slate-500",
        parts: [
            { url: "/appreciation/appreciationThanks", module: "Thanks" },
            { url: "/appreciation/appreciationStars", module: "Stars" },
            { url: "/appreciation/appreciationLeaderboard", module: "Leaderboard" },
            { url: "/appreciation/appreciationHighlights", module: "Highlights" }
        ]
    },
};
