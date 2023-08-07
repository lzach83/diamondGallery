"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.raw({ type: "image/*", limit: "10mb" }));
app.use("/", routes_1.default);
// Global error handling
app.use((_req, res) => {
    res.status(500).send("Uh oh! An unexpected error occured.");
});
app.listen(port, () => console.log(`APP ON ${port}`));
//# sourceMappingURL=server.js.map