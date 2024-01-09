/* tslint:disable */
/* eslint-disable */

export interface AddressDto {
    city?: string;
    id?: number;
    postalCode?: string;
    street?: string;
    postalCode?: string;
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
}

export interface OrderReadDto {
    id?: number;
    addressStart?: string;
    addressEnd?: string;
    customerFirstName?: string;
    customerLastName?: string;
    customerTelephoneNumber?: string;
    partner?: string;
    deliveryMan?: string;
    totalPrice?: number;
    tip?: number;
    creationDate?: string;
    completionDate?: string;
    status?: string;
    distanceInKm?: number;
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
    id?: number;
    partner?: PartnerDto;
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
    id?: number;
    name?: string;
    accountNumber?: string;
    contactNumber?: string;
    owner?: UserDto;
    address?: AddressDto;
    categories?: CategoryDto[];
}

export interface PartnerReviewDto {
    id?: number;
    date?: Date;
    description?: string;
    grade_in_stars?: number;
    partner?: PartnerDto;
    reviewer?: UserDto;
}

export interface ProductDto {
    id?: number;
    name?: string;
    description?: string;
    photoPath?: string;
    price?: number;
    onSale?: boolean;
    categories?: CategoryDto[];
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
    accountNumber?: string;
    contactNumber?: string;
    address?: AddressDto;
    category?:string;
}

export interface RegisterResponseDto {
    message?: string;
}

export interface RegisterUserDto {
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    email?: string;
    password?: string;
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
    id?: number;
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    email?: string;
    role?: RoleDto;
}

export interface UserReadDto {
    id: number;
    firstName: string;
    lastName: string;
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
