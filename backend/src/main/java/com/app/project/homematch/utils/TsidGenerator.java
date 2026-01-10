package com.app.project.homematch.utils;

import io.hypersistence.tsid.TSID;

public class TsidGenerator {
    private static final TsidGenerator INSTANCE = new TsidGenerator();
    private final TSID.Factory factory;

    private static final int NODE_COUNT = 8;

    private TsidGenerator() {
        int nodeBits = ((int) (Math.log(NODE_COUNT) / Math.log(2))) + 1;

        factory = TSID.Factory.builder()
                .withNodeBits(nodeBits)
                .build();
    }

    public static TsidGenerator getInstance() {
        return INSTANCE;
    }

    public Long generateNewTsid() {
        return factory.generate().toLong();
    }

}
