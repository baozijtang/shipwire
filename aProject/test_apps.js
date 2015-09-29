describe("myBeacon1", function() {
    it("should be able to append 2 strings", function() {
        expect(new BeaconEncoder().addFieldTruncationRule("left2",
        BeaconEncoder.TRUNCATION_STRING_LEFT, 2).
    addFieldTruncationRule("left3",
        BeaconEncoder.TRUNCATION_STRING_LEFT, 3).
    addFieldTruncationRule("right2",
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 2).
    addFieldTruncationRule("right3",
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    addFieldTruncationRule("int2",
        BeaconEncoder.TRUNCATION_INTEGER, 2).
    addFieldTruncationRule("int3",
        BeaconEncoder.TRUNCATION_INTEGER, 3).
    addArrayTruncationRule("array1", 10,
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    encode({
        "array1" : ["ABCDERERE", "EFRERERE", "IERERERREJ"],
        "int2" : 12.4,
        "int3" : 39999.9999,
        "left2" : "ABCEE",
        "left3" : "EABC",
        "right2" : "ABCEE",
        "right3" : "ABCEE",
        "ignored" : "1234" })).toBe("array1=[ABC,EFR]&int2=12&int3=999&left2=EE&left3=ABC&right2=AB&right3=ABC");
    });
});

describe("myBeacon2", function() {
    it("should be able to append 2 strings", function() {
        expect(new BeaconEncoder().addFieldTruncationRule("left2",
        BeaconEncoder.TRUNCATION_STRING_LEFT, 2).
    addFieldTruncationRule("left3",
        BeaconEncoder.TRUNCATION_STRING_LEFT, 3).
    addFieldTruncationRule("right2",
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 2).
    addFieldTruncationRule("right3",
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    addFieldTruncationRule("int2",
        BeaconEncoder.TRUNCATION_INTEGER, 2).
    addFieldTruncationRule("int3",
        BeaconEncoder.TRUNCATION_INTEGER, 3).
    addArrayTruncationRule("array1", 10,
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    encode({
        "array1" : "IERERERREJ",
        "int2" : -1.9,
        "int3" : 0,
        "left2" : 121,
        "left3" : "EABC",
        "right2" : ["ABCEE"],
        "right3" : "ABCEE",
        "ignored" : "1234" })).toBe("array1=error: not an array&int2=-2&int3=0&left2=error: not correct input&left3=ABC&right2=error: not correct input&right3=ABC");
    });
});

describe("myBeacon3", function() {
    it("should be able to append 2 strings", function() {
        expect(new BeaconEncoder().addFieldTruncationRule("left2",
        BeaconEncoder.TRUNCATION_STRING_LEFT, 2).
    addFieldTruncationRule("left3",
        BeaconEncoder.TRUNCATION_STRING_LEFT, 3).
    addFieldTruncationRule("right2",
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 2).
    addFieldTruncationRule("right3",
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    addFieldTruncationRule("int2",
        BeaconEncoder.TRUNCATION_INTEGER, 2).
    addFieldTruncationRule("int3",
        BeaconEncoder.TRUNCATION_INTEGER, 3).
    addArrayTruncationRule("array1", 10,
        BeaconEncoder.TRUNCATION_STRING_RIGHT, 3).
    encode({
        "array1" : ["A","B","CC","DDD"], 
        "int2" : -100,
        "int3" : "testtest0000 ",
        "left2" : 121,
        "left3" : "EABC",
        "right2" : 232323,
        "right3" : "ABCEE",
        "ignored" : "1234" })).toBe("array1=[A,B,CC]&int2=-9&int3=error: not correct input&left2=error: not correct input&left3=ABC&right2=error: not correct input&right3=ABC");
    });
});

