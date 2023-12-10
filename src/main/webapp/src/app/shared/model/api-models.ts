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
    address?: AddressDto;
    categories?: CategoryDto[];
    contactNumber?: string;
    id?: number;
    name?: string;
    owner?: UserDto;
}

export interface PartnerReviewDto {
    date?: Date;
    description?: string;
    grade_in_stars?: number;
    id?: number;
    partner?: PartnerDto;
    reviewer?: UserDto;
}

export interface ProductDto {
    categories?: CategoryDto[];
    description?: string;
    id?: number;
    name?: string;
    onSale?: boolean;
    photoPath?: string;
    price?: number;
}

export interface RegisterDeliveryManDto {
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
    contactNumber?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    password?: string;
    telephoneNumber?: string;
    category?:string;
}

export interface RegisterResponseDto {
    message?: string;
}

export interface RegisterUserDto {
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
    email?: string;
    firstName?: string;
    id?: number;
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

export enum NullHandling {
    NATIVE = "NATIVE",
    NULLS_FIRST = "NULLS_FIRST",
    NULLS_LAST = "NULLS_LAST",
}
