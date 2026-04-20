import Map "mo:core/Map";
import Types "types/scan";
import ScanLib "lib/scan";
import ScanMixin "mixins/scan-api";

actor {
  let sessions : ScanLib.SessionStore = Map.empty<Text, Types.ScanSession>();
  include ScanMixin(sessions);
};
