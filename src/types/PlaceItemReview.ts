/**
 * Interface representing a review for a place item.
 */
export interface PlaceItemReview {
  /**
   * The unique identifier for the place item.
   */
  placeItemUUID: string

  /**
   * The name of the place item.
   */
  placeItemName: string

  /**
   * The price of the place item.
   */
  placeItemPrice: number

  /**
   * The rating given to the place item.
   */
  placeItemRating: number

  /**
   * The comment provided for the place item.
   */
  placeItemComment: string
}
