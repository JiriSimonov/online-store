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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs/promises");
var path = require("path");
var sourceJSON = require('./src/source.json');
var outPathTest = path.resolve(__dirname, 'out', 'keyboards.json');
var outPathDev = path.resolve('src', 'data', 'keyboards.json');
var SwitchShorts;
(function (SwitchShorts) {
    SwitchShorts["Cherry MX RGB Brown"] = "BR";
    SwitchShorts["Cherry MX Brown"] = "BR";
    SwitchShorts["Cherry MX Blue"] = "B";
    SwitchShorts["Cherry MX RGB Blue"] = "B";
    SwitchShorts["Cherry MX RGB Black"] = "BL";
    SwitchShorts["Cherry MX Black"] = "BL";
    SwitchShorts["Cherry MX RGB Clear"] = "CL";
    SwitchShorts["Cherry MX Clear"] = "CL";
    SwitchShorts["Cherry MX RGB Silent Red"] = "SR";
    SwitchShorts["Cherry MX Silent Red"] = "SR";
    SwitchShorts["Cherry MX RGB Red"] = "R";
    SwitchShorts["Cherry MX Red"] = "R";
    SwitchShorts["Cherry MX Speed Silver"] = "SS";
    SwitchShorts["Cherry MX RGB Speed Silver"] = "SS";
    SwitchShorts["Cherry MX Silent Black"] = "SB";
    SwitchShorts["Gateron CAP V2 Crystal Brown"] = "CBR";
    SwitchShorts["Gateron CAP V2 Crystal Blue"] = "CB";
    SwitchShorts["Gateron CAP V2 Crystal Red"] = "CR";
    SwitchShorts["Gateron CAP V2 Crystal Yellow"] = "CY";
    SwitchShorts["Gateron CAP V2 Crystal Silent Red"] = "CSR";
    SwitchShorts["Gateron CAP V2 Crystal Speed Silver"] = "CSS";
    SwitchShorts["Gateron CAP v2 Crystal Speed Silver"] = "CSS";
    SwitchShorts["Cherry MX Green"] = "GR";
    SwitchShorts["Varmilo EC Daisy V2"] = "ED";
    SwitchShorts["Varmilo EC Sakura V2"] = "ES";
    SwitchShorts["Varmilo EC Rose V2"] = "ER";
    SwitchShorts["Varmilo EC Ivy V2"] = "EI";
    SwitchShorts["Gateron G Pro Red"] = "GPR";
    SwitchShorts["Gateron G Pro Brown"] = "GPBR";
    SwitchShorts["Gateron G Pro Blue"] = "GPB";
    SwitchShorts["Kailh Prestige Red"] = "KPR";
    SwitchShorts["Kailh Prestige Clicky"] = "KPC";
    SwitchShorts["Gateron G Pro 2 Silver"] = "GPS";
    SwitchShorts["Gateron G Pro 2 White"] = "GPW";
    SwitchShorts["Gateron G Pro 2 Yellow"] = "GPY";
    SwitchShorts["Gateron G Pro 2 Red"] = "GPR";
    SwitchShorts["Gateron G Pro 2 Brown"] = "GPBR";
    SwitchShorts["Varmilo EC V2 Iris"] = "EIR";
    SwitchShorts["Varmilo EC V2 Violet"] = "EV";
    SwitchShorts["TTC Speed Silver"] = "TSS";
    SwitchShorts["Keychron Optical Low Profile Brown"] = "KBR";
    SwitchShorts["Keychron Optical Low Profile Red"] = "KLR";
    SwitchShorts["Keychron Optical Low Profile Mint"] = "KLM";
    SwitchShorts["Keychron Optical Low Profile Banana"] = "KLN";
    SwitchShorts["Keychron Optical Low Profile Blue"] = "KLB";
    SwitchShorts["Topre 45g"] = "T";
    SwitchShorts["Topre 45g Silent"] = "TS";
    SwitchShorts["Topre 30g"] = "T";
    SwitchShorts["Topre Variable"] = "TV";
    SwitchShorts["Topre Variable Silent"] = "TVS";
    SwitchShorts["Gateron G Pro Yellow"] = "GPY";
    SwitchShorts["Zeal PC Zilents V2 67g"] = "ZI";
    SwitchShorts["Zeal PC Tealios V2"] = "TE";
    SwitchShorts["Zeal PC Zealios v2 67g"] = "ZE";
    SwitchShorts["Novelkeys X Kailh BOX Crystal Navy"] = "NA";
    SwitchShorts["Novelkeys X Kailh BOX Crystal Royal"] = "KRO";
    SwitchShorts["Gateron Low Profile Blue"] = "GLB";
    SwitchShorts["Gateron Low Profile Brown"] = "GLBR";
    SwitchShorts["Gateron Low Profile Red"] = "GLR";
    SwitchShorts["Akko CS Jelly Pink"] = "AJP";
    SwitchShorts["Akko CS Jelly Purple"] = "AJR";
    SwitchShorts["Varmilo EC V2 Jasmine"] = "EJ";
})(SwitchShorts || (SwitchShorts = {}));
function getSwitch(sourceSwitch) {
    var getManufacturer = function (title) {
        var head = (title || '').split(' ')[0];
        switch (head) {
            case 'Zeal':
                return 'Gateron';
            case 'Novelkeys':
                return 'Kailh';
            default:
                return head;
        }
    };
    var id = sourceSwitch.id, quantity = sourceSwitch.quantity;
    var title = sourceSwitch["switch"];
    var short = SwitchShorts[title];
    return {
        id: id,
        title: title,
        quantity: quantity,
        isAvailable: quantity > 0,
        manufacturer: getManufacturer(title),
        short: short
    };
}
function getKeyboard(sourceKeyboard) {
    var _a;
    var id = sourceKeyboard.id, title = sourceKeyboard.title, size = sourceKeyboard.size;
    var switches = sourceKeyboard.variants.map(function (v) { return getSwitch(v); });
    return {
        id: id,
        title: title,
        minPrice: sourceKeyboard.minVisiblePrice,
        isAvailable: switches.some(function (item) { return item.quantity; }),
        switches: switches,
        size: size,
        brands: sourceKeyboard.manufacturer,
        features: ((_a = sourceKeyboard.props) === null || _a === void 0 ? void 0 : _a.Фичи) || []
    };
}
function getKeyboardList(source) {
    return Object.values(source).map(getKeyboard);
}
exports["default"] = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.mkdir(path.dirname(outPathTest), { recursive: true })];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs.mkdir(path.dirname(outPathDev), { recursive: true })];
            case 2:
                _a.sent();
                list = getKeyboardList(sourceJSON);
                // console.log(new Set(list.map((v) => v.switches.map((c) => c.title)).flat()));
                return [2 /*return*/, Promise.all([outPathTest, outPathDev].map(function (v) { return fs.writeFile(v, JSON.stringify(list)); }))];
        }
    });
}); });
