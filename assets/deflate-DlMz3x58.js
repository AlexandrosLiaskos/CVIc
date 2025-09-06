import { i as inflate_1 } from "./pako.esm-ByZNE5QS.js";
import { B as BaseDecoder } from "./basedecoder-RlaJh0FT.js";
class DeflateDecoder extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
}
export {
  DeflateDecoder as default
};
//# sourceMappingURL=deflate-DlMz3x58.js.map
