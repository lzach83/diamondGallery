"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conn_1 = require("../db/conn");
const upload_client_1 = require("@uploadcare/upload-client");
const multer = require("multer");
const storage = multer.memoryStorage();
const uploader = multer({
    storage: storage,
});
const router = express_1.default.Router();
router.get("/health-check", (_req, res) => {
    res.send("Hello World!");
});
router.get("/getImages", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield conn_1.db.collection("images").find({}).toArray();
        res.json(images);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: error.message || "Failed to fetch images" });
    }
}));
router.post("/uploadImage", uploader.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield conn_1.db.collection("images").insertOne({
            image: req.file,
            createdAt: new Date(),
        });
        res.send(result);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: error.message || "Failed to get uploaded files" });
    }
}));
//Does not work due to MIME type
router.post("/uploadTest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.body;
        if (!file) {
            return res.status(400).json({ error: "File not found in the request" });
        }
        const fileData = yield (0, upload_client_1.uploadDirect)(file, {
            publicKey: "e35cd74bc5c34a71c41e",
            store: true,
        });
        return res.status(200).json({ fileData });
    }
    catch (error) {
        console.error("Error during file upload:", error);
        return res
            .status(500)
            .json({ error: "An error occurred during file upload" });
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map