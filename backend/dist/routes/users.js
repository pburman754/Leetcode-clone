"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../data/users");
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    const user = (0, users_1.getUserById)(parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});
exports.default = router;
