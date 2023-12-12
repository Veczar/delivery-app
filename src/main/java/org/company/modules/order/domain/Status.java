package org.company.modules.order.domain;

public enum Status {
    done("zrealizowane"),
    inPreparation("w przygotowaniu"),

    inDelivery("w drodze"),
    readyForDelivery("gotowe do odbioru");
    private final String status;
    Status(final String status)
    {
        this.status = status;
    }

    @Override
    public String toString() {
        return status;
    }
}