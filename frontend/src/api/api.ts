/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Category {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /** Category group */
  category_group: string;

  /** Name ru */
  name_ru: string;
}

export interface Contact {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /**
   * Place
   * @format uuid
   */
  place: string;

  /** Type */
  type: "website" | "phone";

  /** Contact */
  contact: string;

  /** Description */
  description?: string | null;
}

export interface Login {
  /** Username */
  username?: string;

  /**
   * Email
   * @format email
   */
  email?: string;

  /** Password */
  password: string;
}

export interface Photo {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /** Url */
  url: string;

  /**
   * Place
   * @format uuid
   */
  place: string;

  /** Source */
  source?: "unknown" | "main" | "yandex" | "tripadvisor";
}

export interface Rating {
  /**
   * Rating avg
   * @min 0
   * @max 5
   */
  rating_avg: number;

  /**
   * Rating cnt
   * @min 0
   */
  rating_cnt: number;

  /**
   * Rating 1
   * @min 0
   */
  rating_1: number;

  /**
   * Rating 2
   * @min 0
   */
  rating_2: number;

  /**
   * Rating 3
   * @min 0
   */
  rating_3: number;

  /**
   * Rating 4
   * @min 0
   */
  rating_4: number;

  /**
   * Rating 5
   * @min 0
   */
  rating_5: number;
}

export interface CategorySerializerShort {
  /** Category group */
  category_group: string;

  /** Name ru */
  name_ru: string;
}

export interface ContactSerializerShort {
  /** Type */
  type: "website" | "phone";

  /** Contact */
  contact: string;

  /** Description */
  description?: string | null;
}

export interface Place {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /** Id business */
  id_business: string;

  /** Title */
  title: string;

  /**
   * Region
   * @format uuid
   */
  region?: string | null;

  /** Lat */
  lat: number;

  /** Lon */
  lon: number;

  /** Href */
  href: string;

  /** Secondary info */
  secondary_info?: string | null;

  /** Place description */
  place_description?: string | null;

  /** Time spent */
  time_spent?: string | null;
  rating: Rating;
  categories?: CategorySerializerShort[];
  contacts?: ContactSerializerShort[];

  /** Photos */
  photos?: string;

  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
}

export interface PlaceCategory {
  /**
   * Place
   * @format uuid
   */
  place: string;

  /**
   * Category
   * @format uuid
   */
  category: string;
}

export interface PlaceReaction {
  /**
   * User
   * @format uuid
   */
  user: string;

  /**
   * Place
   * @format uuid
   */
  place: string;

  /** Type */
  type: "LIKE" | "DISLIKE" | "SKIP";
}

export interface Region {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /** Name */
  name: string;

  /** Id business */
  id_business: string;
}

export interface Review {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /**
   * Place
   * @format uuid
   */
  place: string;

  /** Review id */
  review_id: string;

  /**
   * Rating settled
   * @min 0
   * @max 5
   */
  rating_settled: number;

  /** Text */
  text: string;

  /** Header */
  header: string;

  /** Href */
  href: string;

  /**
   * Say review useful cnt
   * @min -2147483648
   * @max 2147483647
   */
  say_review_useful_cnt?: number;

  /**
   * Dt publish
   * @format date-time
   */
  dt_publish: string;

  /**
   * Dt visit
   * @format date-time
   */
  dt_visit?: string | null;

  /** Visit extra info */
  visit_extra_info?: string | null;

  /** Author name */
  author_name: string;

  /**
   * Author contribution cnt
   * @min -2147483648
   * @max 2147483647
   */
  author_contribution_cnt?: number;

  /** Author profile href */
  author_profile_href: string;

  /** Author hometown */
  author_hometown?: string | null;

  /** Author profile img url */
  author_profile_img_url?: string | null;
}

export interface Tracking {
  /**
   * Id
   * @format uuid
   */
  id?: string;

  /**
   * User
   * @format uuid
   */
  user: string;

  /** Event name */
  event_name: string;

  /** Data */
  data: object;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://pickspot.app/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {"Content-Type": ContentType.Json}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title pick_spot API
 * @version v1
 * @baseUrl http://pickspot.app/api
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  categories = {
    /**
     * No description
     *
     * @tags categories
     * @name CategoriesList
     * @request GET:/categories/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Category)[] }`
     */
    categoriesList: (query?: { limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Category[] }, any>({
        path: `/categories/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesCreate
     * @request POST:/categories/
     * @secure
     * @response `201` `Category`
     */
    categoriesCreate: (data: Category, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/categories/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesRead
     * @request GET:/categories/{id}/
     * @secure
     * @response `200` `Category`
     */
    categoriesRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/categories/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesUpdate
     * @request PUT:/categories/{id}/
     * @secure
     * @response `200` `Category`
     */
    categoriesUpdate: (id: string, data: Category, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/categories/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesPartialUpdate
     * @request PATCH:/categories/{id}/
     * @secure
     * @response `200` `Category`
     */
    categoriesPartialUpdate: (id: string, data: Category, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/categories/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesDelete
     * @request DELETE:/categories/{id}/
     * @secure
     * @response `204` `void`
     */
    categoriesDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/categories/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  contacts = {
    /**
     * No description
     *
     * @tags contacts
     * @name ContactsList
     * @request GET:/contacts/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Contact)[] }`
     */
    contactsList: (query?: { limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Contact[] }, any>({
        path: `/contacts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsCreate
     * @request POST:/contacts/
     * @secure
     * @response `201` `Contact`
     */
    contactsCreate: (data: Contact, params: RequestParams = {}) =>
      this.http.request<Contact, any>({
        path: `/contacts/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsRead
     * @request GET:/contacts/{id}/
     * @secure
     * @response `200` `Contact`
     */
    contactsRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Contact, any>({
        path: `/contacts/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsUpdate
     * @request PUT:/contacts/{id}/
     * @secure
     * @response `200` `Contact`
     */
    contactsUpdate: (id: string, data: Contact, params: RequestParams = {}) =>
      this.http.request<Contact, any>({
        path: `/contacts/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsPartialUpdate
     * @request PATCH:/contacts/{id}/
     * @secure
     * @response `200` `Contact`
     */
    contactsPartialUpdate: (id: string, data: Contact, params: RequestParams = {}) =>
      this.http.request<Contact, any>({
        path: `/contacts/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsDelete
     * @request DELETE:/contacts/{id}/
     * @secure
     * @response `204` `void`
     */
    contactsDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/contacts/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * @description Check the credentials and return the REST Token if the credentials are valid and authenticated. Calls Django Auth login method to register User ID in Django session framework Accept the following POST parameters: username, password Return the REST Framework Token Object's key.
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     * @response `201` `Login`
     */
    loginCreate: (data: Login, params: RequestParams = {}) =>
      this.http.request<Login, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  photos = {
    /**
     * No description
     *
     * @tags photos
     * @name PhotosList
     * @request GET:/photos/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Photo)[] }`
     */
    photosList: (query?: { ordering?: string; limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Photo[] }, any>({
        path: `/photos/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags photos
     * @name PhotosCreate
     * @request POST:/photos/
     * @secure
     * @response `201` `Photo`
     */
    photosCreate: (data: Photo, params: RequestParams = {}) =>
      this.http.request<Photo, any>({
        path: `/photos/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags photos
     * @name PhotosRead
     * @request GET:/photos/{id}/
     * @secure
     * @response `200` `Photo`
     */
    photosRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Photo, any>({
        path: `/photos/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags photos
     * @name PhotosUpdate
     * @request PUT:/photos/{id}/
     * @secure
     * @response `200` `Photo`
     */
    photosUpdate: (id: string, data: Photo, params: RequestParams = {}) =>
      this.http.request<Photo, any>({
        path: `/photos/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags photos
     * @name PhotosPartialUpdate
     * @request PATCH:/photos/{id}/
     * @secure
     * @response `200` `Photo`
     */
    photosPartialUpdate: (id: string, data: Photo, params: RequestParams = {}) =>
      this.http.request<Photo, any>({
        path: `/photos/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags photos
     * @name PhotosDelete
     * @request DELETE:/photos/{id}/
     * @secure
     * @response `204` `void`
     */
    photosDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/photos/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  places = {
    /**
     * No description
     *
     * @tags places
     * @name PlacesList
     * @request GET:/places/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Place)[] }`
     */
    placesList: (query?: { ordering?: string; limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Place[] }, any>({
        path: `/places/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesCreate
     * @request POST:/places/
     * @secure
     * @response `201` `Place`
     */
    placesCreate: (data: Place, params: RequestParams = {}) =>
      this.http.request<Place, any>({
        path: `/places/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesLikedRead
     * @request GET:/places/liked/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Place)[] }`
     */
    placesLikedRead: (query?: { ordering?: string; limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Place[] }, any>({
        path: `/places/liked/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesRead
     * @request GET:/places/{id}/
     * @secure
     * @response `200` `Place`
     */
    placesRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Place, any>({
        path: `/places/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesUpdate
     * @request PUT:/places/{id}/
     * @secure
     * @response `200` `Place`
     */
    placesUpdate: (id: string, data: Place, params: RequestParams = {}) =>
      this.http.request<Place, any>({
        path: `/places/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesPartialUpdate
     * @request PATCH:/places/{id}/
     * @secure
     * @response `200` `Place`
     */
    placesPartialUpdate: (id: string, data: Place, params: RequestParams = {}) =>
      this.http.request<Place, any>({
        path: `/places/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesDelete
     * @request DELETE:/places/{id}/
     * @secure
     * @response `204` `void`
     */
    placesDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/places/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags places
     * @name PlacesSimilarRead
     * @request GET:/places/{id}/similar/
     * @secure
     * @response `200` `Place`
     */
    placesSimilarRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Place, any>({
        path: `/places/${id}/similar/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  placesCategories = {
    /**
     * No description
     *
     * @tags places_categories
     * @name PlacesCategoriesList
     * @request GET:/places_categories/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (PlaceCategory)[] }`
     */
    placesCategoriesList: (query?: { limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<
        { count: number; next?: string | null; previous?: string | null; results: PlaceCategory[] },
        any
      >({
        path: `/places_categories/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places_categories
     * @name PlacesCategoriesCreate
     * @request POST:/places_categories/
     * @secure
     * @response `201` `PlaceCategory`
     */
    placesCategoriesCreate: (data: PlaceCategory, params: RequestParams = {}) =>
      this.http.request<PlaceCategory, any>({
        path: `/places_categories/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places_categories
     * @name PlacesCategoriesRead
     * @request GET:/places_categories/{id}/
     * @secure
     * @response `200` `PlaceCategory`
     */
    placesCategoriesRead: (id: string, params: RequestParams = {}) =>
      this.http.request<PlaceCategory, any>({
        path: `/places_categories/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places_categories
     * @name PlacesCategoriesUpdate
     * @request PUT:/places_categories/{id}/
     * @secure
     * @response `200` `PlaceCategory`
     */
    placesCategoriesUpdate: (id: string, data: PlaceCategory, params: RequestParams = {}) =>
      this.http.request<PlaceCategory, any>({
        path: `/places_categories/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places_categories
     * @name PlacesCategoriesPartialUpdate
     * @request PATCH:/places_categories/{id}/
     * @secure
     * @response `200` `PlaceCategory`
     */
    placesCategoriesPartialUpdate: (id: string, data: PlaceCategory, params: RequestParams = {}) =>
      this.http.request<PlaceCategory, any>({
        path: `/places_categories/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags places_categories
     * @name PlacesCategoriesDelete
     * @request DELETE:/places_categories/{id}/
     * @secure
     * @response `204` `void`
     */
    placesCategoriesDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/places_categories/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  reactions = {
    /**
     * No description
     *
     * @tags reactions
     * @name ReactionsList
     * @request GET:/reactions/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (PlaceReaction)[] }`
     */
    reactionsList: (query?: { limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<
        { count: number; next?: string | null; previous?: string | null; results: PlaceReaction[] },
        any
      >({
        path: `/reactions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reactions
     * @name ReactionsCreate
     * @request POST:/reactions/
     * @secure
     * @response `201` `PlaceReaction`
     */
    reactionsCreate: (data: PlaceReaction, params: RequestParams = {}) =>
      this.http.request<PlaceReaction, any>({
        path: `/reactions/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reactions
     * @name ReactionsRead
     * @request GET:/reactions/{id}/
     * @secure
     * @response `200` `PlaceReaction`
     */
    reactionsRead: (id: string, params: RequestParams = {}) =>
      this.http.request<PlaceReaction, any>({
        path: `/reactions/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reactions
     * @name ReactionsUpdate
     * @request PUT:/reactions/{id}/
     * @secure
     * @response `200` `PlaceReaction`
     */
    reactionsUpdate: (id: string, data: PlaceReaction, params: RequestParams = {}) =>
      this.http.request<PlaceReaction, any>({
        path: `/reactions/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reactions
     * @name ReactionsPartialUpdate
     * @request PATCH:/reactions/{id}/
     * @secure
     * @response `200` `PlaceReaction`
     */
    reactionsPartialUpdate: (id: string, data: PlaceReaction, params: RequestParams = {}) =>
      this.http.request<PlaceReaction, any>({
        path: `/reactions/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reactions
     * @name ReactionsDelete
     * @request DELETE:/reactions/{id}/
     * @secure
     * @response `204` `void`
     */
    reactionsDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/reactions/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  regions = {
    /**
     * No description
     *
     * @tags regions
     * @name RegionsList
     * @request GET:/regions/
     * @secure
     * @response `200` `(Region)[]`
     */
    regionsList: (query?: { ordering?: string }, params: RequestParams = {}) =>
      this.http.request<Region[], any>({
        path: `/regions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags regions
     * @name RegionsCreate
     * @request POST:/regions/
     * @secure
     * @response `201` `Region`
     */
    regionsCreate: (data: Region, params: RequestParams = {}) =>
      this.http.request<Region, any>({
        path: `/regions/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags regions
     * @name RegionsRead
     * @request GET:/regions/{id}/
     * @secure
     * @response `200` `Region`
     */
    regionsRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Region, any>({
        path: `/regions/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags regions
     * @name RegionsUpdate
     * @request PUT:/regions/{id}/
     * @secure
     * @response `200` `Region`
     */
    regionsUpdate: (id: string, data: Region, params: RequestParams = {}) =>
      this.http.request<Region, any>({
        path: `/regions/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags regions
     * @name RegionsPartialUpdate
     * @request PATCH:/regions/{id}/
     * @secure
     * @response `200` `Region`
     */
    regionsPartialUpdate: (id: string, data: Region, params: RequestParams = {}) =>
      this.http.request<Region, any>({
        path: `/regions/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags regions
     * @name RegionsDelete
     * @request DELETE:/regions/{id}/
     * @secure
     * @response `204` `void`
     */
    regionsDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/regions/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  reviews = {
    /**
     * No description
     *
     * @tags reviews
     * @name ReviewsList
     * @request GET:/reviews/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Review)[] }`
     */
    reviewsList: (
      query?: { place?: string; ordering?: string; limit?: number; offset?: number },
      params: RequestParams = {},
    ) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Review[] }, any>({
        path: `/reviews/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reviews
     * @name ReviewsCreate
     * @request POST:/reviews/
     * @secure
     * @response `201` `Review`
     */
    reviewsCreate: (data: Review, params: RequestParams = {}) =>
      this.http.request<Review, any>({
        path: `/reviews/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reviews
     * @name ReviewsRead
     * @request GET:/reviews/{id}/
     * @secure
     * @response `200` `Review`
     */
    reviewsRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Review, any>({
        path: `/reviews/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reviews
     * @name ReviewsUpdate
     * @request PUT:/reviews/{id}/
     * @secure
     * @response `200` `Review`
     */
    reviewsUpdate: (id: string, data: Review, params: RequestParams = {}) =>
      this.http.request<Review, any>({
        path: `/reviews/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reviews
     * @name ReviewsPartialUpdate
     * @request PATCH:/reviews/{id}/
     * @secure
     * @response `200` `Review`
     */
    reviewsPartialUpdate: (id: string, data: Review, params: RequestParams = {}) =>
      this.http.request<Review, any>({
        path: `/reviews/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reviews
     * @name ReviewsDelete
     * @request DELETE:/reviews/{id}/
     * @secure
     * @response `204` `void`
     */
    reviewsDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/reviews/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  tracking = {
    /**
     * No description
     *
     * @tags tracking
     * @name TrackingList
     * @request GET:/tracking/
     * @secure
     * @response `200` `{ count: number, next?: string | null, previous?: string | null, results: (Tracking)[] }`
     */
    trackingList: (query?: { limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.http.request<{ count: number; next?: string | null; previous?: string | null; results: Tracking[] }, any>({
        path: `/tracking/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tracking
     * @name TrackingCreate
     * @request POST:/tracking/
     * @secure
     * @response `201` `Tracking`
     */
    trackingCreate: (data: Tracking, params: RequestParams = {}) =>
      this.http.request<Tracking, any>({
        path: `/tracking/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tracking
     * @name TrackingRead
     * @request GET:/tracking/{id}/
     * @secure
     * @response `200` `Tracking`
     */
    trackingRead: (id: string, params: RequestParams = {}) =>
      this.http.request<Tracking, any>({
        path: `/tracking/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tracking
     * @name TrackingUpdate
     * @request PUT:/tracking/{id}/
     * @secure
     * @response `200` `Tracking`
     */
    trackingUpdate: (id: string, data: Tracking, params: RequestParams = {}) =>
      this.http.request<Tracking, any>({
        path: `/tracking/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tracking
     * @name TrackingPartialUpdate
     * @request PATCH:/tracking/{id}/
     * @secure
     * @response `200` `Tracking`
     */
    trackingPartialUpdate: (id: string, data: Tracking, params: RequestParams = {}) =>
      this.http.request<Tracking, any>({
        path: `/tracking/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tracking
     * @name TrackingDelete
     * @request DELETE:/tracking/{id}/
     * @secure
     * @response `204` `void`
     */
    trackingDelete: (id: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/tracking/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
