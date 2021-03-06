export declare enum EnumDLRErrorCode {
    /**Successful. */
    OK = 0,
    /**Unknown error. */
    UNKNOWN = -10000,
    /**Not enough memory to perform the operation. */
    NO_MEMORY = -10001,
    /**Null pointer */
    NULL_POINTER = -10002,
    /**License invalid*/
    LICENSE_INVALID = -10003,
    /**License expired*/
    LICENSE_EXPIRED = -10004,
    /**File not found*/
    FILE_NOT_FOUND = -10005,
    /**The file type is not supported. */
    FILETYPE_NOT_SUPPORTED = -10006,
    /**The BPP (Bits Per Pixel) is not supported. */
    BPP_NOT_SUPPORTED = -10007,
    /**Failed to read the image. */
    IMAGE_READ_FAILED = -10012,
    /**Failed to read the TIFF image. */
    TIFF_READ_FAILED = -10013,
    /**Failed to read the PDF image. */
    PDF_READ_FAILED = -10021,
    /**The PDF DLL is missing. */
    PDF_DLL_MISSING = -10022,
    /**Recognition timeout*/
    RECOGNITION_TIMEOUT = -10026,
    /**Json parse failed*/
    JSON_PARSE_FAILED = -10030,
    /**Json type invalid*/
    JSON_TYPE_INVALID = -10031,
    /**Json key invalid*/
    JSON_KEY_INVALID = -10032,
    /**Json value invalid*/
    JSON_VALUE_INVALID = -10033,
    /**Json name key missing*/
    JSON_NAME_KEY_MISSING = -10034,
    /**The value of the key "Name" is duplicated.*/
    JSON_NAME_VALUE_DUPLICATED = -10035,
    /**Template name invalid*/
    TEMPLATE_NAME_INVALID = -10036,
    /**Parameter value invalid*/
    PARAMETER_VALUE_INVALID = -10038,
    /**Failed to set mode's argument.*/
    SET_MODE_ARGUMENT_ERROR = -10051,
    /**Failed to get mode's argument.*/
    GET_MODE_ARGUMENT_ERROR = -10055,
    /**Character Model file is not found*/
    CHARACTER_MODEL_FILE_NOT_FOUND = -10100
}
//# sourceMappingURL=enumdlrerrorcode.d.ts.map