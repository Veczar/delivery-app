/* tslint:disable */
/* eslint-disable */

export interface AddressDto {
    id?: number;
    street?: string;
    city?: string;
    postalCode?: string;
    userId: number;
}

export interface AuthRequestDto {
    email?: string;
    password?: string;
}

export interface AuthResponseDto {
    token?: string;
    role?: string;
    expirationDate?: string;
    firstName?: string;
    lastName?: string;
    id?: number;
}

export interface RegisterDeliveryManDto {
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    email?: string;
    password?: string;
    workingArea?: string;
    accountNumber?: string;
}

export interface RegisterPartnerDto {
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    email?: string;
    password?: string;
    name?: string;
    description?: string;
    accountNumber?: string;
    contactNumber?: string;
    openHour?: string;
    closeHour?: string;
    websiteLink?: string;
    expectedWaitingTime?: number;
    owner?: UserDto;
    address?: AddressDto;
    type?: PartnerType;
}

export interface RegisterResponseDto {
    message?: string;
}

export interface RegisterUserDto {
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    address?: AddressDto;
    email?: string;
    password?: string;
}

export interface CategoryDto {
    id?: number;
    name?: string;
    description?: string;
}

export interface ComplaintDto {
    id?: number;
    description?: string;
    title?: string;
    methodOfContact?: ContactMethod;
    creationDate?: Date;
    user?: UserDto;
}

export interface ComplaintReadDto {
    id?: number;
    description?: string;
    title?: string;
    methodOfContact?: ContactMethod;
    creationDate?: Date;
    userFirstName?: string;
    userLastName?: string;
    userEmail?: string;
    userTelephoneNumber?: string;
}

export interface DeliveryManDto {
    id?: number;
    workingArea?: string;
    accountNumber?: string;
    user?: UserDto;
}

export interface OrderDto {
    id?: number;
    addressStart?: AddressDto;
    addressEnd?: AddressDto;
    customer?: UserDto;
    partner?: PartnerDto;
    deliveryMan?: DeliveryManDto;
    totalPrice?: number;
    tip?: number;
    creationDate?: Date;
    completionDate?: Date;
    status?: Status;
    distanceInKm?: number;
    rating?: number;
}

export interface OrderReadDto {
    id?: number;
    addressStart?: string;
    addressEnd?: string;
    customerFirstName?: string;
    customerLastName?: string;
    customerTelephoneNumber?: string;
    partner?: string;
    partnerPhotoPath?: string;
    deliveryManId?: number;
    deliveryManFirstName?: string;
    deliveryManLastName?: string;
    totalPrice?: number;
    tip?: number;
    creationDate?: string;
    completionDate?: string;
    status?: Status;
    distanceInKm?: number;
    rating?: number;
}

export interface PartnerDto {
    id?: number;
    name?: string;
    description?: string;
    accountNumber?: string;
    contactNumber?: string;
    openHour?: string;
    closeHour?: string;
    websiteLink?: string;
    expectedWaitingTime?: number;
    owner: UserDto;
    photoPath?: string;
    type?: PartnerType;
}

export interface PartnerReadDto {
    name?: string;
    partnerType?: PartnerType;
    address?: AddressDto;
    photoPath?: string;
    expectedWaitingTime?: number;
}

export interface PartnerReviewDto {
    id?: number;
    gradeInStars?: number;
    description?: string;
    date?: string;
    reviewer?: UserDto;
    partner?: PartnerDto;
}

export interface PartnerReviewReadDto {
    id: number;
    gradeInStars?: number;
    partnerId?: number;
    description?: string;
    date?: string;
    reviewer: UserDto;
}

export interface ProductDto {
    id?: number;
    name?: string;
    description?: string;
    photoPath?: string;
    onSale?: boolean;
    price: number;
    categories?: CategoryDto[];
    owner?: PartnerDto;
}

export interface ProductReadDto {
    id: number;
    name?: string;
    description?: string;
    photoPath?: string;
    onSale?: boolean;
    price?: number;
    categories?: CategoryDto[];
    owner?: PartnerDto;
}

export interface ProductOrderDto {
    product?: ProductDto;
    order?: OrderDto;
    quantity?: number;
    subtotal?: number;
}

export interface RecurringOrderDto {
    id?: number;
    addressStart?: AddressDto;
    addressEnd?: AddressDto;
    quantity?: number;
    frequency?: Frequency;
    startDate?: Date;
    customer?: UserDto;
    product?: ProductDto;
}

export interface RoleDto {
    id?: number;
    name?: string;
}

export interface UserCredentialsDto {
    email?: string;
    password?: string;
}

export interface UserDto {
    id?: number;
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    email?: string;
    role?: RoleDto;
    addresses: AddressDto[];
}

export interface UserReadDto {
    id?: number;
    firstName?: string;
    lastName?: string;
}

export interface UserCriteria extends BaseCriteria {
    firstName?: string;
    lastName?: string;
}

export interface PageRequestDto {
    page?: number;
    size?: number;
    sortDirection?: Direction;
    sortBy?: string;
    pageRequest?: Pageable;
}

export interface BaseCriteria {
    pageRequestDto?: PageRequestDto;
}

export interface Pageable {
    offset?: number;
    sort?: Sort;
    unpaged?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
}

export interface Sort extends Streamable<Order>, Serializable {
    sorted?: boolean;
    unsorted?: boolean;
}

export interface Serializable {
}

export interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {
    empty?: boolean;
}

export interface Order extends Serializable {
    direction?: Direction;
    property?: string;
    ignoreCase?: boolean;
    nullHandling?: NullHandling;
    ascending?: boolean;
    descending?: boolean;
}

export interface Iterable<T> {
}

export interface Supplier<T> {
}

export interface Stream<T> extends BaseStream<T, Stream<T>> {
}

export interface BaseStream<T, S> extends AutoCloseable {
    parallel?: boolean;
}

export interface AutoCloseable {
}

export enum PartnerType {
    other = "other",
    restaurant = "restaurant",
    pharmacy = "pharmacy",
    groceryStore = "groceryStore",
    florists = "florists",
    coffeeHouse = "coffeeHouse",
}

export enum ContactMethod {
    phone = "phone",
    email = "email",
}

export enum Status {
    inPreparation = "inPreparation",
    readyForDelivery = "readyForDelivery",
    inDelivery = "inDelivery",
    done = "done",
}

export enum Frequency {
    everyDay = "everyDay",
    every2Days = "every2Days",
    every3Days = "every3Days",
    every4Days = "every4Days",
    every5Days = "every5Days",
    every6Days = "every6Days",
    everyWeek = "everyWeek",
    every2Weeks = "every2Weeks",
    every3Weeks = "every3Weeks",
    every4Weeks = "every4Weeks",
}

export enum Direction {
    ASC = "ASC",
    DESC = "DESC",
}

export enum NullHandling {
    NATIVE = "NATIVE",
    NULLS_FIRST = "NULLS_FIRST",
    NULLS_LAST = "NULLS_LAST",
}
