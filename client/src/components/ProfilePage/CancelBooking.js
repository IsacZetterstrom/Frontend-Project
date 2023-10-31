import fetchService from "../../service/FetchService";
/**
 * @author Isac Zetterström, Niklas Nguyen
 * @description Simple function to unbook bookings
 */
export default function CancelBooking(id, setUpDate) {
  fetchService.fetchRes(`/profile/user/bookings/${id}`, "DELETE");
  setTimeout(() => setUpDate(id), 2000);
}
