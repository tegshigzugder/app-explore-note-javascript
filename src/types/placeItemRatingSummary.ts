/**
 * Interface representing the summary of ratings for a place item.
 */
export interface ratingSummary {
  /**
   * The unique identifier for the rating summary.
   */
  id: number

  /**
   * The name of the place item.
   */
  name: string

  /**
   * The average rating of the place item.
   */
  averageRating: number

  /**
   * The total number of ratings received by the place item.
   */
  numberOfRatings: number

  /**
   * The comments to the place.
   */
  comments: string[]
}
