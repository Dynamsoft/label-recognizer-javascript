import { EnumDLRLocalizationSourceType } from '../enum/enumdlrlocalizationsourcetype';
import { DLRQuadrilateral } from './dlrquadrilateral';
export interface DLRReferenceRegion {
    localizationSourceType: EnumDLRLocalizationSourceType;
    location: DLRQuadrilateral;
    regionMeasuredByPercentage: number;
    regionPredetectionModesIndex: number;
    barcodeFormatIds: number;
    barcodeFormatIds_2: number;
    barcodeTextRegExPattern: string;
}
//# sourceMappingURL=dlrreferenceregion.d.ts.map