/**
 * @author Louise Johansson
 * @description Helper function to check if the release date is in the future
 */
export default function isFutureRelease(releaseDate) {
  const currentDate = new Date();
  const movieReleaseDate = new Date(releaseDate);
  return movieReleaseDate > currentDate;
}
