/**
 * Interface representing a review for a place item.
 */
export interface placeItemReview {
  /**
   * The unique identifier for the place item review.
   */
  placeItemReviewId: number

  /**
   * The rating given in the review.
   */
  rating: number

  /**
   * The comment provided in the review.
   */
  comment: string
}

/**
 * Interface representing a place item.
 */
export interface placeItem {
  /**
   * The unique identifier for the place item.
   */
  placeItemId: number

  /**
   * The name of the place item.
   */
  placeItemName: string

  /**
   * The price of the place item.
   */
  placeItemPrice: number

  /**
   * The list of reviews for the place item.
   */
  placeItemReviews: placeItemReview[]
}

/**
 * Interface representing the details of a place.
 */
export interface placeDetailsDto {
  /**
   * The unique identifier for the node.
   */
  nodeId: number

  /**
   * The amenity type of the place.
   */
  amenity: amenity

  /**
   * The name of the place.
   */
  placeName: string

  /**
   * The location of the place.
   */
  location: string

  /**
   * The list of reviews for the place.
   */
  reviews: review[]

  /**
   * The list of items available at the place.
   */
  placeItems: placeItem[]
}

/**
 * Interface representing a review.
 */
export interface review {
  /**
   * The unique identifier for the review.
   */
  reviewId: number

  /**
   * The rating given in the review.
   */
  rating: number

  /**
   * The comment provided in the review.
   */
  comment: string
}

/**
 * Enum representing different types of amenities.
 */
export enum amenity {
  BAR = 'Bar',
  BIERGARTEN = 'Biergarten',
  CAFE = 'Cafe',
  FAST_FOOD = 'Fast_food',
  FOOD_COURT = 'Food_court',
  ICE_CREAM = 'Ice_cream',
  PUB = 'Pub'
}
