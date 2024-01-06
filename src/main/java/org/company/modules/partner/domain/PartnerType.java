package org.company.modules.partner.domain;

public enum PartnerType {
    other("Other"),
    restaurant("Restaurant"),
    pharmacy("Pharmacy"),
    groceryStore("Grocery store"),
    florist("Florist's"),
    coffeehouse("Coffeehouse");
    private final String text;

    PartnerType(final String text) {
        this.text = text;
    }
    public String getText() {
        return this.text;
    }

    public static PartnerType fromString(String text) {
        for (PartnerType b : PartnerType.values()) {
            if (b.text.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }
    @Override
    public String toString() {
        return text;
    }
}
