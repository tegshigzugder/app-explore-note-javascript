/**
 * Interface representing the response data for a place.
 */
export interface PlaceResponseDto {
  /**
   * The name of the place.
   */
  name: string

  /**
   * The type of amenity at the place.
   */
  amenity: string

  /**
   * The source of the place data.
   */
  source: string

  /**
   * The unique identifier for the node.
   */
  nodeId: number

  /**
   * The latitude coordinate of the place.
   */
  lat: number

  /**
   * The longitude coordinate of the place.
   */
  lon: number
}
