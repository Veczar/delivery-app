/* tslint:disable */
/* eslint-disable */

export interface AddressDto {
    city?: string;
    id?: number;
    postalCode?: string;
    street?: string;
}

export interface AuthRequestDto {
    email?: string;
    password?: string;
}

export interface AuthResponseDto {
    expirationDate?: string;
    firstName?: string;
    id?: number;
    lastName?: string;
    role?: string;
    token?: string;
}

export interface AutoCloseable {
}

export interface BaseCriteria {
    pageRequestDto?: PageRequestDto;
}

export interface BaseStream<T, S> extends AutoCloseable {
    parallel?: boolean;
}

export interface CategoryDto {
    description?: string;
    id?: number;
    name?: string;
}

export interface DeliveryManDto {
    accountNumber?: string;
    id?: number;
    rating?: number;
    user?: UserDto;
    workingArea?: string;
}

export interface Iterable<T> {
}

export interface Order extends Serializable {
    ascending?: boolean;
    descending?: boolean;
    direction?: Direction;
    ignoreCase?: boolean;
    nullHandling?: NullHandling;
    property?: string;
}

export interface OrderDto {
    addressEnd?: AddressDto;
    addressStart?: AddressDto;
    completionDate?: Date;
    creationDate?: Date;
    customer?: UserDto;
    deliveryMan?: DeliveryManDto;
    distanceInKm?: number;
    id?: number;
    partner?: PartnerDto;
    rating?: number;
    status?: Status;
    tip?: number;
    totalPrice?: number;
}

export interface OrderReadDto {
    addressEnd?: string;
    addressStart?: string;
    completionDate?: string;
    creationDate?: string;
    customerFirstName?: string;
    customerLastName?: string;
    customerTelephoneNumber?: string;
    deliveryManFirstName?: string;
    deliveryManId?: number;
    deliveryManLastName?: string;
    distanceInKm?: number;
    id?: number;
    partner?: string;
    partnerPhotoPath?: string;
    rating?: number;
    status?: Status;
    tip?: number;
    totalPrice?: number;
}

export interface PageRequestDto {
    page?: number;
    pageRequest?: Pageable;
    size?: number;
    sortBy?: string;
    sortDirection?: Direction;
}

export interface Pageable {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sort?: Sort;
    unpaged?: boolean;
}

export interface PartnerDto {
    accountNumber?: string;
    closeHour?: string;
    contactNumber?: string;
    description?: string;
    expectedWaitingTime?: number;
    id?: number;
    name?: string;
    openHour?: string;
    owner: UserDto;
    photoPath?: string;
    type?: PartnerType;
    websiteLink?: string;
}

export interface PartnerReadDto {
    address?: AddressDto;
    name?: string;
    partnerType?: PartnerType;
    photoPath?: string;
}

export interface PartnerReviewDto {
    date?: string;
    description?: string;
    gradeInStars?: number;
    id?: number;
    partner?: PartnerDto;
    reviewer: UserDto;
}

export interface PartnerReviewReadDto {
    date?: string;
    description?: string;
    gradeInStars?: number;
    id: number;
    partnerId?: number;
    reviewer: UserDto;
}

export interface ProductDto {
    categories?: CategoryDto[];
    description?: string;
    id?: number;
    name?: string;
    onSale?: boolean;
    owner?: PartnerDto;
    photoPath?: string;
    price: number;
}

export interface ProductOrderDto {
    order?: OrderDto;
    product?: ProductDto;
    quantity?: number;
    subtotal?: number;
}

export interface ProductReadDto {
    categories?: CategoryDto[];
    description?: string;
    id: number;
    name?: string;
    onSale?: boolean;
    owner?: PartnerDto;
    photoPath?: string;
    price?: number;
}

export interface RecurringOrderDto {
    addressEnd?: AddressDto;
    addressStart?: AddressDto;
    customer?: UserDto;
    frequency?: Frequency;
    id?: number;
    product?: ProductDto;
    quantity?: number;
    startDate?: Date;
}

export interface RegisterDeliveryManDto {
    accountNumber?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    telephoneNumber?: string;
    workingArea?: string;
}

export interface RegisterPartnerDto {
    accountNumber?: string;
    address?: AddressDto;
    closeHour?: string;
    contactNumber?: string;
    description?: string;
    email?: string;
    expectedWaitingTime?: number;
    firstName?: string;
    lastName?: string;
    name?: string;
    openHour?: string;
    owner?: UserDto;
    password?: string;
    telephoneNumber?: string;
    type?: PartnerType;
    websiteLink?: string;
}

export interface RegisterResponseDto {
    message?: string;
}

export interface RegisterUserDto {
    address?: AddressDto;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    telephoneNumber?: string;
}

export interface RoleDto {
    id?: number;
    name?: string;
}

export interface Serializable {
}

export interface Sort extends Streamable<Order>, Serializable {
    sorted?: boolean;
    unsorted?: boolean;
}

export interface Stream<T> extends BaseStream<T, Stream<T>> {
}

export interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {
    empty?: boolean;
}

export interface Supplier<T> {
}

export interface UserCredentialsDto {
    email?: string;
    password?: string;
}

export interface UserCriteria extends BaseCriteria {
    firstName?: string;
    lastName?: string;
}

export interface UserDto {
    addresses: AddressDto[];
    email?: string;
    firstName?: string;
    id: number;
    lastName?: string;
    role?: RoleDto;
    telephoneNumber?: string;
}

export interface UserReadDto {
    firstName?: string;
    id?: number;
    lastName?: string;
}

export enum Direction {
    ASC = "ASC",
    DESC = "DESC",
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

export enum NullHandling {
    NATIVE = "NATIVE",
    NULLS_FIRST = "NULLS_FIRST",
    NULLS_LAST = "NULLS_LAST",
}

export enum PartnerType {
    other = "other",
    restaurant = "restaurant",
    pharmacy = "pharmacy",
    groceryStore = "groceryStore",
    florists = "florists",
    coffeeHouse = "coffeeHouse",
}

export enum Status {
    inPreparation = "inPreparation",
    readyForDelivery = "readyForDelivery",
    inDelivery = "inDelivery",
    done = "done",
}
export interface GoogleMapsResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Row[];
    status: string;
  }
  
  interface Row {
    elements: Element[];
  }
  
  interface Element {
    distance: Distance;
    duration: Duration;
    status: string;
  }
  
  interface Distance {
    text: string;
    value: number;
  }
  
  interface Duration {
    text: string;
    value: number;
  }