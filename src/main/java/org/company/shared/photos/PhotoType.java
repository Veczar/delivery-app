package org.company.shared.photos;

public enum PhotoType {
    product("products"),
    partner("partners");
    private final String text;

    PhotoType(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
