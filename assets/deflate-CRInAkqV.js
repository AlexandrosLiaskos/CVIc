import { i as inflate_1 } from "./pako.esm-ByZNE5QS.js";
import { B as BaseDecoder } from "./geotiff-70LCDX0v.js";
import "./georaster-layer-D-eO7TID.js";
class DeflateDecoder extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
}
export {
  DeflateDecoder as default
};
//# sourceMappingURL=deflate-CRInAkqV.js.map
